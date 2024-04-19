import { verifyToken } from "@/(db)/lib/auth";
import { NextResponse,NextRequest } from "next/server";
import db from "@/(db)/secrets";
import { z } from "zod";
const UserData = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    image: z.string().optional(),
})
export const dynamic = 'force-dynamic' 
export async function POST(req: NextRequest, res: NextResponse): Promise<void | Response> {
    try {
      const token = req.cookies.get('token')?.value 
      if (!token) {
      return Response.json({ status: 'error', message: 'No token found' });
    }
    const user = await verifyToken(token);
    if (!user) {
      return Response.json({ status: 'error', message: 'Invalid token' });
    }
    const data =  UserData.parse(req.json());
    if (!data) {
      return Response.json({ status: 'error', message: 'No data found' });
    }
    const res = await db.users.update({
      where: {
        id: user?.payload?.id as string,
      },
      data: {
        email: data.email?? user?.payload?.email as string,
        image: data.image ?? user?.payload?.image as string,
        name: data.name ?? user?.payload?.name as string,
      },
    }); 

    if (!res) {
      return Response.json({ status: 'error', message: 'An error occurred while updating your profile.' });
    }

    return Response.json({ status: 'success', message: 'Profile updated successfully' });
    
    } catch (error) {
       if (error instanceof z.ZodError) {
        return Response.json({ status: 'error', message: error.errors[0].message });
       }
        console.error(error);
        return Response.json({ status: 'error', message: 'An error occurred while processing your request.' });
    }
}