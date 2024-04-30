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

        // Get this month's date and the date one month ago
        const today = new Date();
        const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);

        // Find orders created this month and last month for the user
        const thisMonthOrders = await db.order.findMany({
            where: {
                userId: user?.payload.id as string,
                createdAt: {
                    gte: new Date(today.getFullYear(), today.getMonth(), 1),
                    lte: new Date(today.setHours(23, 59, 59, 999))
                },
                status: 'DELIVERED'
            },
            select: {
                id: true,
                price: true,
                createdAt: true,
                total: true, // is mean count of order items
            }
        });

        const lastMonthOrders = await db.order.findMany({
            where: {
                userId: user?.payload.id as string,
                createdAt: {
                    gte: new Date(lastMonth.setHours(0, 0, 0, 0)),
                    lte: new Date(lastMonthEnd.setHours(23, 59, 59, 999))
                },
                status: 'DELIVERED'
            },
            select: {
                id: true,
                price: true,
                createdAt: true,
                total: true, // is mean count of order items
            }
        });

        // Get the total price of orders created this month and last month
        const totalThisMonthPrice = thisMonthOrders.reduce((acc, order) => acc + order.price, 0);
        const totalLastMonthPrice = lastMonthOrders.reduce((acc, order) => acc + order.price, 0);

        // Calculate the percentage if there are orders, otherwise set to 0
        const percentage = totalLastMonthPrice !== 0 ?
            ((totalThisMonthPrice - totalLastMonthPrice) / totalLastMonthPrice) * 100 :
            0;

        // Determine percentage status
        const percentageStatus = totalThisMonthPrice > totalLastMonthPrice ? 'positive' : 'negative';

        const data = {
            thisMonthCount: thisMonthOrders.length,
            lastMonthCount: lastMonthOrders.length,
            thisMonthOrders,
            lastMonthOrders,
            percentage,
            totalThisMonthPrice,
            totalLastMonthPrice,
            percentageStatus
        };

        return Response.json({ status: 'success', data, message: 'Orders found' });
    } catch (error) {
        console.error(error);
        return Response.json({ status: 'error', message: 'An error occurred while processing your request.' });
    }
}
