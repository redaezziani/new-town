import { verifyToken } from "@/(db)/lib/auth";
import db from "@/(db)/secrets";
import { NextResponse,NextRequest } from "next/server";
export const dynamic = 'force-dynamic' 


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

        // Get today's date and the date 7 days ago
        const today = new Date();
        const last7Days = new Date(today);
        last7Days.setDate(today.getDate() - 7);

        // Find products created today and in the last 7 days for the user
        const todayProducts = await db.orderItem.findMany({
            where: {
                userId: user?.payload.id as string,
                createdAt: {
                    gte: new Date(today.setHours(0, 0, 0, 0)),
                    lte: new Date(today.setHours(23, 59, 59, 999))
                }
            },
            select  : {
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
        
        const last7DaysProducts = await db.orderItem.findMany({
            where: {
                userId: user?.payload.id as string,
                createdAt: {
                    gte: new Date(last7Days.setHours(0, 0, 0, 0)), // Corrected usage of last7Days
                    lte: new Date(today.setHours(23, 59, 59, 999))
                }
            },
            select  : {
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

        // lets get the bercentage of products created today and in the last 7 days
        // get the total price of products created today and in the last 7 days
        const totalTodayPrice = todayProducts.reduce((acc, product) => acc + product.price * product.quantity, 0) || 0
        const totalLast7DaysPrice = last7DaysProducts.reduce((acc, product) => acc + product.price * product.quantity, 0) || 0
        // the percentage is the revenue generated today compared to the revenue generated in the last 7 days
        const percentage = totalTodayPrice / totalLast7DaysPrice * 100 || 0

        const data = {
            todayCount: todayProducts.length,
            last7DaysCount: last7DaysProducts.length,
            todayProducts,
            last7DaysProducts,
            percentage,
            totalTodayPrice,
            totalLast7DaysPrice

        }
        return Response.json({ status: 'success', data, message: 'Products found' });
    } catch (error) {
        console.error(error);
        return Response.json({ status: 'error', message: 'An error occurred while processing your request.' });

    }
}
