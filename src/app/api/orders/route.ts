import { verifyToken } from "@/(db)/lib/auth";
import db from "@/(db)/secrets";
import { NextResponse, NextRequest } from "next/server";
export const dynamic = 'force-dynamic'
import z from 'zod'



const CreateOrderSchema = z.object({
    deliveryId: z.string(),
    name: z.string(),
    address: z.string(),
    phone: z.string(),
    email: z.string(),
    deliveryDate: z.date(),
    orderItems: z.array(z.object({
        id: z.string(),
        quantity: z.number(),
        name: z.string(), 
        price: z.number(), 
        currency: z.string(),
    })),
})
type OrderType = z.infer<typeof CreateOrderSchema>
export async function GET(req: NextRequest, res: NextResponse): Promise<void | Response> {
    try {
        const token = req.cookies.get('token')?.value;
        if (!token) {
            return Response.json({ status: 'error', message: 'No token found' });
        }
        const user = await verifyToken(token);

        if (!user) {
            return Response.json({ status: 'error', message: 'User not found' });
        }
        const orders = await db.order.findMany(
            {
                where: {
                    userId: user?.payload.id as string
                },
                orderBy: {
                    // get the newest orders first
                    createdAt: 'desc'
                }
            }
        );
        return Response.json({ status: 'success', data: orders, message: 'Orders found' });
    }

    catch (error) {
        console.error(error);
        return Response.json({ status: 'error', message: 'An error occurred while processing your request.' });
    }
}
export async function POST(req: NextRequest, res: NextResponse): Promise<void | Response> {
    let transaction;
    try {
        const token = req.cookies.get('token')?.value;
        if (!token) {
            return Response.json({ status: 'error', message: 'No token found' });
        }
        const user = await verifyToken(token);

        if (!user) {
            return Response.json({ status: 'error', message: 'User not found' });
        }
        const {
            deliveryId,
            name,
            address,
            phone,
            email,
            orderItems,
            deliveryDate
        } = await req.json() as OrderType;
        
        if (!deliveryId || !name ||
            !address || !phone || !email) {
            return Response.json({ status: 'error', message: 'All fields are required' });
        }

        const total = orderItems.reduce((acc, item) => acc + item.quantity, 0);
        const price = orderItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

        const groupedOrderItems = orderItems.reduce((acc, item) => {
            if (!acc[item.id]) {
                acc[item.id] = item;
            } else {
                acc[item.id].quantity += item.quantity;
            }
            return acc;
        }, {} as Record<string, { id: string; quantity: number; price: number }>);
        // if stock is less than the quantity of the product
        const products = await db.products.findMany({
            where: {
                id: {
                    in: Object.keys(groupedOrderItems)
                }
            }
        });
        const outOfStock = products.filter(product => product.stock < groupedOrderItems[product.id].quantity);
        if (outOfStock.length) {
            return Response.json({ status: 'error', message: 'Some products are out of stock' });
        }
        
        transaction = await db.$transaction([
            db.delivery.findUnique({
                where: {
                    id: deliveryId,
                },
                select: {
                    isActive: true,
                    id: true,
                },
            }),
            db.order.create({
                data: {
                    userId: user.payload.id as string,
                    deliveryId: deliveryId,
                    name: name,
                    address: address,
                    phone: phone,
                    email: email,
                    status: 'PENDING',
                    total: total,
                    price: price,
                    deliveryDate: deliveryDate,
                },
            }),
        ]);

        // Check if delivery is available
        if (!transaction[0]?.isActive) {
            return Response.json({ status: 'error', message: 'Delivery is not available' });
        }

        const orderId = transaction[1].id;

        // Add order items
        const resItems = await Promise.all(
            Object.values(groupedOrderItems).map((item) =>
                db.orderItem.create({
                    data: {
                        orderId,
                        productId: item.id,
                        quantity: item.quantity,
                        price: item.price,
                        userId: user.payload.id as string,
                    },
                })
            )
        );
        if (!resItems) {
            return Response.json({ status: 'error', message: 'An error occurred while adding order items' });
        }
        // update the product quantity
        const resProducts = await Promise.all(
            Object.values(groupedOrderItems).map((item) =>
                db.products.update({
                    where: {
                        id: item.id,
                    },
                    data: {
                        stock: {
                            decrement: item.quantity,
                        },
                    },
                })
            )
        );

        if (!resProducts) {
           return Response.json({ status: 'error', message: 'An error occurred while updating product quantity' });
        }
        return Response.json({ status: 'success', message: 'Order created', data: transaction[1] });

    }
    catch (error) {
        console.error(error);
        if (transaction) {
            const rollback = await db.$queryRaw`ROLLBACK`;
            console.log('Rollback', rollback);

        }
        return Response.json({ status: 'error', message: 'An error occurred while processing your request.' });
    }
}



export async function DELETE(req: NextRequest, res: NextResponse): Promise<void | Response> {
    try {
        const token = req.cookies.get('token')?.value;
        if (!token) {
            return Response.json({ status: 'error', message: 'No token found' });
        }
        const user = await verifyToken(token);

        if (!user) {
            return Response.json({ status: 'error', message: 'User not found' });
        }
        const { data } = await req.json() as { data: string[] };

        if (!data) {
            return Response.json({ status: 'error', message: 'ID is required' });
        }
        const orders = await db.order.deleteMany({
            where: {
                id: {
                    in: data
                },
                userId: user?.payload.id as string
            }
        });

        if (!orders) {
            return Response.json({ status: 'error', message: 'An error occurred while deleting the order' });
        }
        return Response.json({ status: 'success', message: 'Order deleted' });
    }
    catch (error) {
        console.error(error);
        return Response.json({ status: 'error', message: 'An error occurred while processing your request.' });
    }
}