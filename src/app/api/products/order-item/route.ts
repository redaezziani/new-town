import { verifyToken } from "@/(db)/lib/auth";
import db from "@/(db)/secrets";
import { NextResponse, NextRequest } from "next/server";

export const dynamic = 'force-dynamic'

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
                    userId: user?.payload.id as string,
                    isActive: true
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

