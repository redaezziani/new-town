import cheerio from 'cheerio';
import { prisma, secret } from '@/(db)/secrets';
import { NextResponse,NextRequest } from "next/server";
import { getDigitsFromString } from '@/app/helpers/lib';

/*
model manga {
  id          String    @id @default(uuid()) @db.VarChar(36)
  title       String
  description String   @default("")
  poster      String  @default("")
  rate        Float    @default(0)
  author      String   @default("")
  artist      String   @default("")
  genres      String[] @default([])
  lastChapter String   @default("")
  status      String   @default("")
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  deletedAt   DateTime?
  website     scrapeWebsite @relation(fields: [websiteId], references: [id])
  websiteId   String
  @@index([title], map: "idx_manga_title") 
}
*/
export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const manga = req.nextUrl.searchParams.get('manga') as string;
        const id = req.nextUrl.searchParams.get('id') as string;
        const url = `${secret.asq_url}/manga/${manga}`;
        const response = await fetch(url);
        const body = await response.text();
        const $ = cheerio.load(body);
        const poster = $('.summary_image a img.img-responsive').attr('src');
        const title = $('.post-title h1').text();
        const rate = $('.vote-details span#averagerate').text();
        const author = $('.author-content a').text();
        const artist = $('.artist-content a').text();
        const getGenres = $('.genres-content a');
        const genres: string[] = [];
        getGenres.each((i, el) => {
            genres.push($(el).text());
        });
        const Chapter = $('.wp-manga-chapter  a').first().text();
        const lastChapter=  getDigitsFromString(Chapter);
        const description = $('.manga-excerpt p').text();
        const status = $('.post-status .post-content_item:nth-child(2) .summary-content').text();
        const year = $('.post-status .post-content_item:nth-child(1) .summary-content').text();
        const createManga = await prisma.manga.create({
            data: {
                title,
                description,
                poster,
                rate: parseFloat(rate),
                author,
                artist,
                genres,
                lastChapter,
                status,
                year,
                website : {
                    connect: {
                        id: id
                    }
                }

            }
        });
        return NextResponse.json({status: "success", data: createManga, "message": "manga data fetched"});
    } catch (error) {
        console.error(error);
    }
}

export  async function GET(req: NextRequest, res: NextResponse) {
    try {
        const allManga = await prisma.manga.findMany();
        return NextResponse.json({status: "success", data: allManga, "message": "all manga data fetched"});
    } catch (error) {
        console.error(error);       
    }
}