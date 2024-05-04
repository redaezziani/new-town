import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";
import { verifyToken } from "@/(db)/lib/auth";
import db from "@/(db)/secrets";
import { UserData } from "@/app/types/help";

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest, res: NextResponse): Promise<void | Response> {
  try {
    const token = req.cookies.get('token')?.value;
    if (!token) {
      return Response.json({ status: 'error', message: 'لم يتم العثور على رمز مميز' });
    }

    const user = await verifyToken(token);
    if (!user) {
      return Response.json({ status: 'error', message: 'رمز مميز غير صالح' });
    }

    const userData =await(req.json());

    const updatedUser = await db.users.update({
      where: { id: user?.payload?.id as string },
      data: {
        email: userData.email ?? user?.payload?.email as string,
        image: userData.image ?? user?.payload?.image as string,
        name: userData.name ?? user?.payload?.name as string,
      },
    });

    if (!updatedUser) {
      return Response.json({ status: 'error', message: 'حدث خطأ أثناء تحديث ملفك الشخصي.' });
    }

    return Response.json({ status: 'success', message: 'تم تحديث الملف الشخصي بنجاح' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ status: 'error', message: error.errors[0].message });
    }
    console.error(error);
    return Response.json({ status: 'error', message: 'حدث خطأ أثناء معالجة طلبك.' });
  }
}
