'use server';
import { supabase } from "@/(db)/secrets";
import { NextResponse,NextRequest } from "next/server";


export async function GET(req: NextRequest, res: NextResponse): Promise<void | Response> {
    try {
        const users = await supabase.from('users').select('*');
        return Response.json({ status: 'success', users , message: 'user found' });
    }
     catch (error) {
        console.error(error);
        return Response.json({ status: 'error', message: 'An error occurred while processing your request.' });
    }
}