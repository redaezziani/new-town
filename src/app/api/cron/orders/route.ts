'use server';
import db from "@/(db)/secrets";
import { NextResponse,NextRequest } from "next/server";


export async function GET(req: NextRequest, res: NextResponse): Promise<void | Response> {
    try {
        const products = await db.products.findMany();
        return Response.json({ status: 'success', products , message: 'user found' });
    }
     catch (error) {
        console.error(error);
        return Response.json({ status: 'error', message: 'An error occurred while processing your request.' });
    }
}