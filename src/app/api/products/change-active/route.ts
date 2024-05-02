import { verifyToken } from "@/(db)/lib/auth";
import db from "@/(db)/secrets";
import { NextResponse,NextRequest } from "next/server";
export const dynamic = 'force-dynamic' 



type SwitchActive = {
    id: string
    isActive: boolean
}
export async function PATCH(req: NextRequest, res: NextResponse): Promise<void | Response> {
    try {
        const token = req.cookies.get('token')?.value;
        if (!token) {
            return Response.json({ status: 'error', message: 'No token found' });
        }
        const user = await verifyToken(token);

        if (!user) {
            return Response.json({ status: 'error', message: 'User not found' });
        }
        const { id, isActive } = await req.json() as SwitchActive;

        if (!id) {
            return Response.json({ status: 'error', message: 'All fields are required' });
        }
        const product = await db.products.update({
            where: {
                id
            },
            data: {
                isActive
            }
        });
        if (!product) {
            return Response.json({ status: 'error', message: 'An error occurred while updating the product mode' });
        }
        return Response.json({ status: 'success', data: product, message: 'Product updated successfully' });
    }
    catch (error) {
        console.error(error);
        return Response.json({ status: 'error', message: 'An error occurred while processing your request.' });
    }
}
