import { NextResponse, NextRequest } from "next/server";
import cheerio from 'cheerio';
import axios from 'axios';
import { verifyToken } from "@/(db)/lib/auth";
import db from "@/(db)/secrets";

interface Product {
    title: string;
    brand: string;
    selling_price: string;
    old_price: string;
    img: string;
    discount: string;
}

enum ProductType {
    men='men',
    women='women',
    kids='kids',
}

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
        const search = req.nextUrl.searchParams.get('search')?.replace(/ /g, '+') || '';
        const type = req.nextUrl.searchParams.get('type') as ProductType;

        if (!search) {
            return Response.json({ status: 'error', message: 'Search query is required.' });
        }

        if (!type) {
            return Response.json({ status: 'error', message: 'Type query is required.' });
        }

        let page = 1; // Start with the first page
        const products: Product[] = [];

        while (true) {
            const base_url = `https://www.namshi.com/uae-ar/${type}/search/?q=${search}&page=${page}`;

            // Fetch the HTML content of the page using Axios
            const response = await axios.get(base_url);
            const html = response.data;

            // Load HTML content into Cheerio
            const $ = cheerio.load(html);

            // Select product elements and extract information
            $('.WidgetContainer_componentArea__pAysp').each((_, el) => {
                const img = $(el).find('.slide img').attr('src') || '';
                const title = $(el).find('.ProductBox_productTitle__6tQ3b').text() || '';
                const brand = $(el).find('.ProductBox_brand__oDc9f').text() || '';
                const selling_price = $(el).find('.ProductPrice_container__axxsw .ProductPrice_value__hnFSS').text() || '';
                const old_price = $(el).find('.ProductPrice_container__axxsw .ProductPrice_oldPrice__xhgwB .ProductPrice_preReductionPrice__S72wT.ProductPrice_large__yN1M7').text() || '';
                const discount = $(el).find('.ProductPrice_container__axxsw .DiscountTag_value__D52x5').text() || '';

                products.push({
                    title,
                    brand,
                    selling_price,
                    old_price,
                    img,
                    discount,
                });
            });

            // Check if there's a next page
            const nextPageExists = $('a.PlpPagination_paginationItem__vNmmt').length > 0;
            if (!nextPageExists) {
                break; // No more pages, exit the loop
            }
            if (page >= 1) {
                break; 
            }
            page++; 

        }

        return Response.json({ status: 'success', message: 'Welcome to the API.', products });

    } catch (error) {
        console.error(error);
        return Response.json({ status: 'error', message: 'An error occurred while processing your request.' });
    }
}


export async function POST(req: NextRequest, res: NextResponse): Promise<void | Response> {
   try {
    const token = req.cookies.get('token')?.value;
    if (!token) {
        return Response.json({ status: 'error', message: 'No token found' });
    }
    const user = await verifyToken(token);

    if (!user) {
        return Response.json({ status: 'error', message: 'User not found' });
    }

    const {products } = await req.json() as { products: Product[] };

    if (!products) {
        return Response.json({ status: 'error', message: 'Products are required' });
    }
    

    const productsData: productsCreateManyInput[] = products.map(product => ({
        userId: user.payload.id as string,
        title: product.title,
        brand: product.brand,
        selling_price: parseFloat(product.selling_price),
        old_price:parseFloat(product.old_price)??0,
        img: product.img,
        discount: parseFloat(product.discount)??0
    }));

    const res = await db.scrape_products.createMany({
        data: productsData
    });

    if (res) {
        return Response.json({ status: 'success', message: 'Products saved successfully.' });
    }
    return Response.json({ status: 'error', message: 'An error occurred while processing your request.' });
   } catch (error) {
         console.error(error);
         return Response.json({ status: 'error', message: 'An error occurred while processing your request.' });
   }
}
