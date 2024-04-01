import axios from 'axios';
import cheerio from 'cheerio';
import { NextResponse, NextRequest } from 'next/server';
import { secret } from '@/(db)/secrets';
import { proxyConfig } from '@/lib/utils';
import { Product } from '@/app/types/scrape';
export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const search = req.nextUrl.searchParams.get('_search');
        const limit = parseInt(req.nextUrl.searchParams.get('_limit') || '10'); 
        const url = `${secret.scrape_base_url}/s?k=${search}`;
        const options = await proxyConfig();
        const response = await axios.get(url, options);
        const body = response.data;
        const $ = cheerio.load(body);
        const title = $('title').text();
        const products: Product[] = [];
        var id= 0;
        $('.s-result-item').each((_, element) => {
            if (products.length >= limit) return; 
            const baseUrl = secret.scrape_base_url?? ''; 
            const product: Product = {
                id: id,
                image: $(element).find('.s-image').attr('src') || '',
                title: $(element).find('h2 a').text().trim() || '',
                rating: $(element).find('.a-icon-alt').text().trim() || '',
                regularPrice: $(element).find('.a-price-whole').text().trim() || '',
                discountedPrice: $(element).find('.a-price.a-text-price .a-offscreen').text().trim() || '',
                stockAvailability: $(element).find('.a-color-price').text().trim() || '',
                otherSellersPrice: $(element).find('.a-spacing-none.a-spacing-top-mini .a-color-base').text().trim() || '',
                shipping: $(element).find('.s-prime .a-icon-checkmark').length > 0 ? 'Free Shipping' : 'Paid Shipping',
                prime: $(element).find('.s-prime').length > 0,
                sponsored: $(element).find('.s-sponsored-label-text').length > 0,
                remainingStock: $(element).find('.a-color-price').text().trim() || '',
                certification: $(element).find('.a-color-price').next().find('.a-section .a-text-bold').text().trim() || '',
                productURL: baseUrl + $(element).find('h2 a').attr('href') || '' 
            };
            id++;
            if (product.title === '') return;
            products.push(product);
        });

        return NextResponse.json({
            status: 'success',
            title,
            data: products,
            message: 'Products fetched successfully',
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            status: 'error',
            message: 'Failed to fetch products',
            note: 'Please check the logs for more information , dont spam the server',
        });
    }
}


