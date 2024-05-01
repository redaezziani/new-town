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
       
        const date = new Date();
        const thisMonth = date.getMonth();
        const prevMonth = thisMonth - 1;
        const thisYear = date.getFullYear();
        
        const currMonthOrders = await db.order.findMany(
            {
                where: {
                    userId: user.payload.id as string,
                    createdAt: {
                        gte: new Date(thisYear, thisMonth, 1),
                        lt: new Date(thisYear, thisMonth + 1, 1)
                    }
                },
                select: {
                    price: true,
                }
            }
        );

        if (!currMonthOrders) {
            return Response.json({ status: 'error', message: 'No orders data found for this month' });
        }
        
        const prevMonthOrders = await db.order.findMany(
            {
                where: {
                    userId: user.payload.id as string,
                    createdAt: {
                        gte: new Date(thisYear, prevMonth, 1),
                        lt: new Date(thisYear, prevMonth + 1, 1)
                    }
                },
                select: {
                    price: true,
                }
            }
        );

        if (!prevMonthOrders) {
            return Response.json({ status: 'error', message: 'No orders data found for the previous month' });
        }

        // Get list of orders prices for the current month
        const currMonthPrices = currMonthOrders.map(order => order.price);
        // Get list of orders prices for the previous month
        const prevMonthPrices = prevMonthOrders.map(order => order.price);

        return Response.json({ status: 'success', data: { prevMonthPrices, currMonthPrices }, message: 'Orders data retrieved successfully' });
    } catch (error) {
        console.error(error);
        return Response.json({ status: 'error', message: 'An error occurred while processing your request.' });
    }
}
