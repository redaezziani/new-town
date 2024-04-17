import { verifyToken } from "@/(db)/lib/auth";
import db from "@/(db)/secrets";
import { NextResponse,NextRequest } from "next/server";
export const dynamic = 'force-dynamic' 

type currency = 'USD' | 'EUR' | 'MAD' | 'AED' | 'SAR' | 'QAR' | 'KWD' | 'BHD' | 'OMR'

interface CreateProductsProps {
    name: string
    description: string
    price: number
    currency: currency
    image ?: string
    stock ?: number
}

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
        const products = await db.products.findMany(
            {
                where: {
                    userId: user?.payload.id as string
                }
            }
        );
        return Response.json({ status: 'success', data: products, message: 'Products found' });
    }
 
    catch (error) {
        console.error(error);
        return Response.json({ status: 'error', message: 'An error occurred while processing your request.' });
    }
}


export async function POST(req: NextRequest, res: NextResponse): Promise<void | Response> {
    try {
        const token = req.cookies.get('token')?.value;
        if (!token) {
            return Response.json({ status: 'error', message: 'No token found' });
        }
        const user = await verifyToken(token);

        if (!user) {
            return Response.json({ status: 'error', message: 'User not found' });
        }
        const { name, description, price, currency, image,stock } = await req.json() as CreateProductsProps;

        if (!name || !description || !price || !currency || !stock) {
            return Response.json({ status: 'error', message: 'All fields are required' });
        }
        const product = await db.products.create({
            data: {
                name,
                description,
                price,
                currency,
                userId: user?.payload.id as string,
                image: image ?? '',
                stock: parseInt(stock.toString()) ?? 0
            }
        });

        if (!product) {
            return Response.json({ status: 'error', message: 'An error occurred while creating the product' });
        }
        return Response.json({ status: 'success', data: product, message: 'Product created' });
    }
    catch (error) {
        console.error(error);
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
        const product = await db.products.deleteMany({
            where: {
                id: {
                    in: data
                },
                userId: user?.payload.id as string
            }
        });

        if (!product) {
            return Response.json({ status: 'error', message: 'An error occurred while deleting the product' });
        }
        return Response.json({ status: 'success', message: 'Product deleted' });
    }
    catch (error) {
        console.error(error);
        return Response.json({ status: 'error', message: 'An error occurred while processing your request.' });
    }
}