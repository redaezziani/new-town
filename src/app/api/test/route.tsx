
import cheerio from 'cheerio';
import { secret } from '@/(db)/secrets';
import { NextResponse,NextRequest } from "next/server";


export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const data = [
            { average: Math.floor(Math.random() * 2000) + 400, today: Math.floor(Math.random() * 1000) },
            { average: Math.floor(Math.random() * 2000) + 400, today: Math.floor(Math.random() * 1000) },
            { average: Math.floor(Math.random() * 2000) + 400, today: Math.floor(Math.random() * 1000) },
            { average: Math.floor(Math.random() * 2000) + 400, today: Math.floor(Math.random() * 1000) },
            { average: Math.floor(Math.random() * 2000) + 400, today: Math.floor(Math.random() * 1000) },
            { average: Math.floor(Math.random() * 2000) + 400, today: Math.floor(Math.random() * 1000) },
            { average: Math.floor(Math.random() * 2000) + 400, today: Math.floor(Math.random() * 1000) },
            { average: Math.floor(Math.random() * 2000) + 400, today: Math.floor(Math.random() * 1000) },
            { average: Math.floor(Math.random() * 2000) + 400, today: Math.floor(Math.random() * 1000) },
            { average: Math.floor(Math.random() * 2000) + 400, today: Math.floor(Math.random() * 1000) },
            // Add more objects as needed
          ];
        return NextResponse.json({status: "success", data: data, "message": "manga data fetched"});
    } catch (error) {
        console.error(error);
    }
}
