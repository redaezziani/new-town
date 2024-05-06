import { NextResponse, NextRequest } from "next/server";
import cheerio from 'cheerio';
import axios from 'axios';
import { verifyToken } from "@/(db)/lib/auth";
import db from "@/(db)/secrets";

interface productsCreateManyInput {
    userId: string;
    title: string;
    brand: string;
    selling_price: number;
    old_price: number;
    img: string;
    discount: number;
}


export const dynamic = 'force-dynamic';
export async function GET(req: NextRequest, res: NextResponse): Promise<void | Response> {
    try {
        const token = req.cookies.get('token')?.value;
        if (!token) {
            return Response.json({ status: 'error', message: 'No token found' });
        }
        const user = await verifyToken(token);
    
        if (!user) {
            return Response.json({ status: 'error', message: 'User not found' });
        }
        const products = await db.scrape_products.findMany({
            where: {
                userId: user.payload.id as string
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return Response.json({ status: 'success', message: 'Welcome to the API.', products });

    } catch (error) {
        console.error(error);
        return Response.json({ status: 'error', message: 'An error occurred while processing your request.' });
    }
}


