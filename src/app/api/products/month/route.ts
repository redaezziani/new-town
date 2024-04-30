import { verifyToken } from "@/(db)/lib/auth";
import db from "@/(db)/secrets";
import { NextResponse, NextRequest } from "next/server";

export const dynamic = 'force-dynamic';

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

        // Get the first day of this month and the last day of last month
        const today = new Date();
        const firstDayThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const lastDayLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);

        // Find products created this month and last month for the user
        const thisMonthProducts = await db.orderItem.findMany({
            where: {
                userId: user?.payload.id as string,
                createdAt: {
                    gte: new Date(firstDayThisMonth.setHours(0, 0, 0, 0)),
                    lte: new Date(today.setHours(23, 59, 59, 999))
                }
            },
            select: {
                id: true,
                price: true,
                createdAt: true,
                product: {
                    select: {
                        currency: true,
                    }
                },
                quantity: true
            }
        });

        const lastMonthProducts = await db.orderItem.findMany({
            where: {
                userId: user?.payload.id as string,
                createdAt: {
                    gte: new Date(lastDayLastMonth.setHours(0, 0, 0, 0)),
                    lte: new Date(firstDayThisMonth.setHours(23, 59, 59, 999))
                }
            },
            select: {
                id: true,
                price: true,
                createdAt: true,
                product: {
                    select: {
                        currency: true,
                    }
                },
                quantity: true
            }
        });

        // Get the total price of products created this month and last month
        const totalThisMonthPrice = thisMonthProducts.reduce((acc, product) => acc + product.price * product.quantity, 0) || 0;
        const totalLastMonthPrice = lastMonthProducts.reduce((acc, product) => acc + product.price * product.quantity, 0) || 0;

        // Calculate the percentage of revenue generated this month compared to last month
        const percentage = totalThisMonthPrice / totalLastMonthPrice * 100 || 0;

        const data = {
            thisMonthCount: thisMonthProducts.length,
            lastMonthCount: lastMonthProducts.length,
            thisMonthProducts,
            lastMonthProducts,
            percentage,
            totalThisMonthPrice,
            totalLastMonthPrice
        };

        return Response.json({ status: 'success', data, message: 'Products found' });
    } catch (error) {
        console.error(error);
        return Response.json({ status: 'error', message: 'An error occurred while processing your request.' });
    }
}
