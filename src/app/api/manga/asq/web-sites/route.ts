import  db  from "@/(db)/secrets";
import { NextResponse,NextRequest } from "next/server";
export async function GET(req: NextRequest, res: NextResponse) {
    try {
      const webSites = await db.scrapeWebsite.findMany();
      return NextResponse.json({status: "success", data: webSites, "message": "web sites fetched"});
    } catch (error) {
        console.error(error);
    }
}

