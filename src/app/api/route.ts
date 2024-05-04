'use server';
import { NextResponse,NextRequest } from "next/server";


export async function GET(req: NextRequest, res: NextResponse): Promise<void | Response> {
    try {
        return Response.json({ status: 'success', message: 'Welcome to the API.' });       
    }
     catch (error) {
        console.error(error);
        return Response.json({ status: 'error', message: 'An error occurred while processing your request.' });
    }
}