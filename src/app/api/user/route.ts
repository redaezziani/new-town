import { verifyToken } from "@/(db)/lib/auth";
import { cookies } from "next/headers";
import { NextResponse,NextRequest } from "next/server";


export  async function GET (req: NextRequest) {
  const payload = await verifyToken(cookies().get('token')?.value??'');
  return NextResponse.json({status: "success", data: payload, "message": "user data fetched"});
}