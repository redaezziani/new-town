import { verifyToken } from "@/(db)/lib/auth";
import { NextResponse,NextRequest } from "next/server";
import {
  createHash,
  verify,
} from 'crypto'
import db from "@/(db)/secrets";
interface UserData {
  name: string;
  email: string;
  image: string;
  passsword : string;
}
export const dynamic = 'force-dynamic' 
export async function POST(req: NextRequest, res: NextResponse): Promise<void | Response> {
    try {
      const token = req.cookies.get('token')?.value 
      if (!token) {
      return Response.json({ status: 'error', message: 'No token found' });
    }
    const user = await verifyToken(token);
    const data: UserData = await req.json();
    if (!data) {
      return Response.json({ status: 'error', message: 'No data found' });
    }

    if (data.passsword) {
      // compare password with the one in the database
      const hashedPassword = createHash('sha256').update(data.passsword).digest('hex');
      if (hashedPassword !== user?.payload?.password) {
        return Response.json({ status: 'error', message: 'Password is incorrect' });
      }

      const res = await db.users.update({
        where: {
          id: user?.payload?.id as string,
        },
        data: {
        password: hashedPassword,
        },
      });
      if (!res) {
        return Response.json({ status: 'error', message: 'An error occurred while updating your password.' });
      }
    }
    const res = await db.users.update({
      where: {
        id: user?.payload?.id as string,
      },
      data: {
        name: data.name,
        email: data.email,
        image: data.image,
      },
    }); 

    if (!res) {
      return Response.json({ status: 'error', message: 'An error occurred while updating your profile.' });
    }

    return Response.json({ status: 'success', message: 'Profile updated successfully' });
    
    } catch (error) {
        console.error(error);
        return Response.json({ status: 'error', message: 'An error occurred while processing your request.' });
    }
}