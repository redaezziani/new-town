import { verifyToken } from "@/(db)/lib/auth";
import { NextResponse,NextRequest } from "next/server";


export const dynamic = 'force-dynamic' 
export async function GET(req: NextRequest, res: NextResponse): Promise<void | Response> {
    try {
      const token = req.cookies.get('token')?.value 
      if (!token) {
      return Response.json({ status: 'error', message: 'No token found' });
    }
  const user = await verifyToken('eyJhbGciOiJIUzI1NiJ9.eyJpZCI6ImQ4YzA3ZjBiLTZmODAtNDFjMC04YTMzLWJkYzA2MDc5MzcxMyIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwidXNlcm5hbWUiOiJhZG1pbiIsInByb2ZpbGUiOiJodHRwczovL2JtanJud3J1eXB6dHBpZXNhc2lsLnN1cGFiYXNlLmNvL3N0b3JhZ2UvdjEvb2JqZWN0L3NpZ24vcHJvZmlsZS9nb2pvLmpwZz90b2tlbj1leUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKMWNtd2lPaUp3Y205bWFXeGxMMmR2YW04dWFuQm5JaXdpYVdGMElqb3hOekV4T1RFMk5EYzFMQ0psZUhBaU9qRTNORE0wTlRJME56VjkudWlsTTJIYnAyZGtUeE1sODIxNE5yQy1ERGpJTlBYWTBvZnRnRkNKVVRiSSZ0PTIwMjQtMDMtMzFUMjAlM0EyMSUzQTE1LjcxMFoiLCJyb2xlIjoidXNlciIsImlhdCI6MTcxMjAwNjQxN30.E4fRxQQtsULf27uRi-D6l8UIWlVspQ42ABNQwDMZbzo');
  return Response.json({ status: 'success', data: user?.payload , message: 'user found' });
    } catch (error) {
        console.error(error);
        // Handle error and return an appropriate response
        return Response.json({ status: 'error', message: 'An error occurred while processing your request.' });
    }
}