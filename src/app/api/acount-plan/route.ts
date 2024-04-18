'use server';
import { verifyToken } from "@/(db)/lib/auth";
import db, { secret, supabase } from "@/(db)/secrets";
import { NextResponse,NextRequest } from "next/server";
import Stripe from "stripe";
export async function POST(req: NextRequest, res: NextResponse): Promise<void | Response> {
    try {
       
        const stripe = new Stripe('sk_test_51OPRuAHDE7eZdLsN9Di6UEqWNbmhvUpPJ6y73UM7L9aGxCtnpJdBomZENFReB0CSEdz56OqV9z7lmxEIszd92SIy00oeuNrWnv', { apiVersion: '2024-04-10' })
        const token = req.cookies.get('token')?.value;
        const {session_id} = await req.json();
        if (!token) {
            return Response.json({ status: 'error', message: 'No token found' });
        }
        const user = await verifyToken(token);
        const origin = req.headers.get("origin") || "http://localhost:3000";
        
        if (!user) {
            return Response.json({ status: 'error', message: 'User not found' });
        }
        if (!user.payload.email) {
            return Response.json({ status: 'error', message: 'User email not found' });
        }

        const {data} = await stripe.checkout.sessions.listLineItems(
            session_id,
            { limit: 1 }
        );
        const isAlreadySubscribed = await db.account.findFirst({
            where: {
                userId: user.payload.email,
                planId: data[0].price?.id as string, 
                isActive: true
            },
        }) as any;
        // if he have already subscribed to this plan  and same plan
        if (isAlreadySubscribed) {
            return Response.json({ status: 'error', message: 'You have already subscribed to this plan' });
        }
        // if he have already subscribed to this plan  but different plan
        if (isAlreadySubscribed && isAlreadySubscribed.planId !== data[0].price?.id) {
            // update the plan
            const updatedAccount = await db.account.update({
                where: {
                    userId: user.payload.id as string,
                    planId: data[0].price?.id as string,
                },
                data: {
                    isActive: true,
                },
            });
            if (!updatedAccount) {
                return Response.json({ status: 'error', message: 'An error occurred while processing your request.' });
            }

            return Response.json({ status: 'success', message: 'Plan updated successfully' });
          
        }
        const account = await db.account.upsert({
            where: {
                userId: user.payload.id as string,
                planId: data[0].price?.id as string,
            },
            create: {
                userId: user.payload.id as string,
                planId: data[0].price?.id as string,
                isActive: true,
            },
            update: {
                isActive: true,
            },
        });
        if (account) {
            return Response.json({ status: 'error', message: 'You have already subscribed to this plan' });
        }
        return Response.json({ status: 'success', message: 'Plan added successfully' });

    }
     catch (error) {
        console.error(error);
        return Response.json({ status: 'error', message: 'An error occurred while processing your request.' });
    }
}