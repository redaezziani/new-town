import { verifyToken } from "@/(db)/lib/auth";
import db from "@/(db)/secrets";
import { NextResponse,NextRequest } from "next/server";
export const dynamic = 'force-dynamic' 

type currency = 'USD' | 'EUR' | 'MAD' | 'AED' | 'SAR' | 'QAR' | 'KWD' | 'BHD' | 'OMR'
interface UpdateProductsProps {
    id: string
    name: string
    description: string
    price: number
    currency: currency
    image ?: string
    stock ?: number
}
export async function PUT(req: NextRequest, res: NextResponse): Promise<void | Response> {
    try {
        const token = req.cookies.get('token')?.value;
        if (!token) {
            return Response.json({ status: 'error', message: 'No token found' });
        }
        const user = await verifyToken(token);

        if (!user) {
            return Response.json({ status: 'error', message: 'User not found' });
        }
        const { id, name, description, price, currency, image, stock } = await req.json() as UpdateProductsProps;

        if (!id || !name || !description || !price || !currency || !stock) {
            return Response.json({ status: 'error', message: 'All fields are required' });
        }
        const product = await db.products.update({
            where: {
                id
            },
            data: {
                name,
                description,
                //@ts-ignore
                price:parseFloat(price) as number,
                currency,
                userId: user?.payload.id as string,
                image: image ?? '',
                stock: parseInt(stock.toString()) ?? 0
            }
        });

        if (!product) {
            return Response.json({ status: 'error', message: 'An error occurred while updating the product' });
        }
        return Response.json({ status: 'success', data: product, message: 'Product updated' });
    }
    catch (error) {
        console.error(error);
        return Response.json({ status: 'error', message: 'An error occurred while processing your request.' });
    }
}
