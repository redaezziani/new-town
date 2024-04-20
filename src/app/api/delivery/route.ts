import { verifyToken } from "@/(db)/lib/auth";
import db from "@/(db)/secrets";
import { NextResponse,NextRequest } from "next/server";
export const dynamic = 'force-dynamic' 
import z from 'zod'





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
        // create a acount for the delivery if the user role is delivery
        const getDelivery = await db.delivery.findMany(
            {  
                where: {
                    isActive: true,
                
                },
                include: {
                    user: {
                        select: {
                            name: true,
                        }
                    }
                },
                
            }
        );

        const data = getDelivery.map((delivery) => {
            return {
                id: delivery.id,
                name: delivery.user.name,
            }
        }
        );
        
        return Response.json({ status: 'success', data, message: 'Delivery found' });
    }
 
    catch (error) {
        console.error(error);
        return Response.json({ status: 'error', message: 'An error occurred while processing your request.' });
    }
}


