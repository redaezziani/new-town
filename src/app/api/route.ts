
import cheerio from 'cheerio';
import { secret } from '@/(db)/secrets';
import { NextResponse,NextRequest } from "next/server";


export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const url = secret.asq_url as string;
        const response = await fetch(url);
        const body = await response.text();
        const $ = cheerio.load(body);
        const title = $('title').text();
        return NextResponse.json({status: "success", data: title, "message": "manga data fetched"});
    } catch (error) {
        console.error(error);
    }
}


/*
https://3asq.org/
https://mangarabic.com/
https://lekmanga.net/
https://mangarose.net/
https://gatemanga.com/
https://azoramoon.com/
*/