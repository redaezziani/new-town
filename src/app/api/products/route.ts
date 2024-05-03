import { verifyToken } from "@/(db)/lib/auth";
import db from "@/(db)/secrets";
import { NextResponse, NextRequest } from "next/server";

export const dynamic = 'force-dynamic'

type currency = 'USD' | 'EUR' | 'MAD' | 'AED' | 'SAR' | 'QAR' | 'KWD' | 'BHD' | 'OMR'

interface CreateProductsProps {
    name: string
    description: string
    price: number
    currency: currency
    image?: string
    stock?: number
}

export async function GET(req: NextRequest, res: NextResponse): Promise<void | Response> {
    try {
        const token = req.cookies.get('token')?.value;
        if (!token) {
            return Response.json({ status: 'error', message: 'لم يتم العثور على رمز' });
        }
        const user = await verifyToken(token);

        if (!user) {
            return Response.json({ status: 'error', message: 'المستخدم غير موجود' });
        }
        const products = await db.products.findMany(
            {
                where: {
                    userId: user?.payload.id as string
                },
                orderBy: {
                    // احصل على أحدث المنتجات أولاً
                    createdAt: 'desc'
                }
            }
        );
        return Response.json({ status: 'success', data: products, message: 'تم العثور على المنتجات' });
    }

    catch (error) {
        console.error(error);
        return Response.json({ status: 'error', message: 'حدث خطأ أثناء معالجة طلبك.' });
    }
}


export async function POST(req: NextRequest, res: NextResponse): Promise<void | Response> {
    try {
        const token = req.cookies.get('token')?.value;
        if (!token) {
            return Response.json({ status: 'error', message: 'لم يتم العثور على رمز' });
        }
        const user = await verifyToken(token);

        if (!user) {
            return Response.json({ status: 'error', message: 'المستخدم غير موجود' });
        }
        const { name, description, price, currency, image, stock } = await req.json() as CreateProductsProps;

        if (!name || !description || !price || !currency || !stock) {
            return Response.json({ status: 'error', message: 'جميع الحقول مطلوبة' });
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
            return Response.json({ status: 'error', message: 'حدث خطأ أثناء إنشاء المنتج' });
        }
        return Response.json({ status: 'success', data: product, message: 'تم إنشاء المنتج' });
    }
    catch (error) {
        console.error(error);
        return Response.json({ status: 'error', message: 'حدث خطأ أثناء معالجة طلبك.' });
    }
}


export async function DELETE(req: NextRequest, res: NextResponse): Promise<void | Response> {
    try {
        const token = req.cookies.get('token')?.value;
        if (!token) {
            return Response.json({ status: 'error', message: 'لم يتم العثور على رمز' });
        }
        const user = await verifyToken(token);

        if (!user) {
            return Response.json({ status: 'error', message: 'المستخدم غير موجود' });
        }
        const { data } = await req.json() as { data: string[] };

        if (!data) {
            return Response.json({ status: 'error', message: 'المعرف مطلوب' });
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
            return Response.json({ status: 'error', message: 'حدث خطأ أثناء حذف المنتج' });
        }
        return Response.json({ status: 'success', message: 'تم حذف المنتج' });
    }
    catch (error) {
        console.error(error);
        return Response.json({ status: 'error', message: 'حدث خطأ أثناء معالجة طلبك.' });
    }
}
