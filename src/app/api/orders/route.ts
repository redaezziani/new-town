import { verifyToken } from "@/(db)/lib/auth";
import db from "@/(db)/secrets";
import { NextResponse,NextRequest } from "next/server";
export const dynamic = 'force-dynamic' 
import z from 'zod'



const CreateOrderSchema = z.object({
    deliveryId: z.string(),
    name: z.string(),
    address: z.string(),
    phone: z.string(),
    email: z.string(),
    total: z.number(),
    price: z.number(),
    orderItems : z.array(z.object({
        productId: z.string(),
        quantity: z.number(),
        price: z.number()
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
            total,
            price,
            orderItems
        }: OrderType = CreateOrderSchema.parse(req.json());

        if (!deliveryId || !name ||
            !address || !phone || !email || !total || !price) {
            return Response.json({ status: 'error', message: 'All fields are required' });
        }
    // Begin transaction
    transaction = await db.$transaction([
      // Check delivery availability
      db.delivery.findUnique({
        where: {
          id: deliveryId,
        },
      }),
      // Create the order in the database
      db.order.create({
        data: {
          userId: user.payload.id as string,
          deliveryId: deliveryId,
          name: name,
          address: address,
          phone: phone,
          email: email,
          status: 'PENDING', // Assuming you want to start with a pending status
          total: total,
          price: price, // Assuming this is the price of the order
          // You can add other fields here based on your schema
        },
      }),
    ]);

    // Check if delivery is available
    if (!transaction[0]?.isActive) {
      throw new Error('Delivery not available');
    }

    const orderId = transaction[1].id;

    // Add order items
    const resItems = await Promise.all(
      orderItems.map((item) =>
        db.orderItem.create({
          data: {
            orderId,
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            userId: user.payload.id as string,
          },
        })
      )
    );

    return  Response.json({ status: 'success', message: 'Order created' , data: transaction[1]});
   
    }
    catch (error) {
        console.error(error);
        if (transaction) {
           // lets rollback the transaction
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