'use server';
import { verifyToken } from '@/(db)/lib/auth';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { publicRoute,privateRoute,REDIRECT_URL ,authRoute} from './lib/auth';


export const middleware= async (request: NextRequest) => {
    const path = request.nextUrl.pathname;
    const token = request.cookies.get('token')?.value??'';
    const isVerified = await verifyToken(token);
    if (publicRoute.includes(path)) {
        return NextResponse.next();
    }
    if (!isVerified && privateRoute.includes(path)) {
        return NextResponse.redirect(new URL(REDIRECT_URL, request.nextUrl).toString());
    }
    if (isVerified && authRoute.includes(path)) {
        return NextResponse.redirect(new URL('/dashboard/main', request.nextUrl).toString());
    }
    return NextResponse.next();    
}

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}


