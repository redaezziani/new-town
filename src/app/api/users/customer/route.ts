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
       
        //get the total customers from the orders that not duplicated db is the prisma client
        const date = new Date();
        const month = date.getMonth();
         const Customers = await db.order.findMany(
            {
                where: {
                    userId: user.payload.id as string,
                    createdAt: {
                        gte: new Date(date.getFullYear(), month, 1),
                        lt: new Date(date.getFullYear(), month + 1, 1)
                    }
                },
                select: {
                    email: true
                }  
            }
        );


        const customres = Customers.filter((item, index) => {
            return Customers.indexOf(item) === index;
        });

        const data = {
            total: customres.length,
            month: month,
            customres
        }
        
        
        return Response.json({ status: 'success', data, message: 'Products found' });
    }
 
    catch (error) {
        console.error(error);
        return Response.json({ status: 'error', message: 'An error occurred while processing your request.' });
    }
}