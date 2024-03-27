

import axios from 'axios';



import cheerio from 'cheerio';
import { NextResponse,NextRequest } from "next/server";


export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const url = "https://www.amazon.fr/Annadue-Sublimation-r%C3%A9sistant-m%C3%A9canique-Sansheng/dp/B089ZQ847D/ref=sr_1_32?crid=32JR12WNPUC6O&dib=eyJ2IjoiMSJ9.NIv3tMVFT44KMmh7p65IP9aupXhwbICef5P4_TwDPP8hqpDf_CJ1XRfwF6s5W0qq5ojyWyB7HSXLE4Uv7wtIBkdI52PUOqUHUQawooTIZdivTsnZpD3Z329qO7yxLbwuCVhoShqwQhOT2VuMJveke6VfXtM4OfZRw0kPYzGOpprO7-o_hFECdOQy49KDn-yEDavfB5vMgE7CSBFFMK-LTv4f47ZaQzfIJWVEBXtgDUt1OM14cCtjvNR68De-lzYYB1t71eyzSoVUqBtj6gN6L5_nq4f3BQWTc-jp7KB26Lk.QS-j4023BXI4rPHMQbJQJzAh4CkkY2G5nURWfrXquSQ&dib_tag=se&keywords=anime+keyboard&qid=1710876343&sprefix=anime+key%2Caps%2C174&sr=8-32"
        const usename = "brd-customer-hl_905e9b76-zone-web_unlocker1"
        const password ="p3dtxk81nbyv"
        const port = 22225
        const session_id = (Math.random() * 1000000).toFixed(0) 
        const options = {
            auth: {
                username: `${usename}-session-${session_id}`, 
                password: password
            },
            host: "brd.superproxy.io",
            port: port,
            rejectUnauthorized: false,
        }
        const response = await axios.get(url, options);
        const body = await response.data;
        const $ = cheerio.load(body);
        const title = $('title').text();
        return NextResponse.json({status: "success", data: title, "message": "manga data fetched"});
    } catch (error) {
        console.error(error);
    }
}



/*
    curl --proxy brd.superproxy.io:22225 --proxy-user brd-customer-hl_905e9b76-zone-web_unlocker1:p3dtxk81nbyv -k https://lumtest.com/myip.json
*/