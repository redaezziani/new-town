import { NextResponse, NextRequest } from "next/server";
import cheerio from 'cheerio';
import axios from 'axios';

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

export const dynamic = 'force-dynamic';
export async function GET(req: NextRequest, res: NextResponse): Promise<void | Response> {
    try {

        const search = req.nextUrl.searchParams.get('search')?.replace(/ /g, '+') || '';
        // default is :men
        const type = req.nextUrl.searchParams.get('type') as ProductType   
        if (!search) {
            console.log('search')
            return Response.json({ status: 'error', message: 'Search query is required.' });
        }
        if (!type) {
            console.log(type)
            return Response.json({ status: 'error', message: 'Type query is required.' });
        }


        const base_url = `https://www.namshi.com/uae-ar/${type}/search/?q=${search}`;
        const products: Product[] = [];

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

        return Response.json({ status: 'success', message: 'Welcome to the API.', products });

    } catch (error) {
        console.error(error);
        return Response.json({ status: 'error', message: 'An error occurred while processing your request.' });
    }
}
