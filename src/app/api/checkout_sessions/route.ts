'use server';
import { verifyToken } from "@/(db)/lib/auth";
import db, { secret, supabase } from "@/(db)/secrets";
import { NextResponse,NextRequest } from "next/server";

// data needed for checkout
export interface CheckoutSubscriptionBody {
  plan: string;
  planDescription: string;
  amount: number;
  interval: "month" | "year";
  customerId?: string;
}
import Stripe from 'stripe'; 

export async function POST(req: NextRequest, res: NextResponse): Promise<void | Response> {
    try {
        const stripe = new Stripe('sk_test_51OPRuAHDE7eZdLsN9Di6UEqWNbmhvUpPJ6y73UM7L9aGxCtnpJdBomZENFReB0CSEdz56OqV9z7lmxEIszd92SIy00oeuNrWnv', { apiVersion: '2024-04-10' })
        const token = req.cookies.get('token')?.value;
        const {priceId} = await req.json();
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
        const isMamber = await db.users.findFirst({
            where: {
                email: user.payload.email,
            },
            include: {
                account: true,
            },
        });
        if (!isMamber) {
            return Response.json({ status: 'error', message: 'User not found' });
        }

        if (!isMamber.stripeId) {
            console.log('creating customer');
            const customer = await stripe.customers.create({
                email: user.payload.email as string,
                name: user.payload.name as string,
            });
            const updatedUser = await db.users.update({
                where: {
                    email: user.payload.email as string,
                },
                data: {
                    stripeId: customer.id,
                },
            });
            if (!updatedUser) {
                return Response.json({ status: 'error', message: 'An error occurred while processing your request.' });
            }

            const session = await stripe.checkout.sessions.create({
                customer: customer.id,
                mode: "subscription",
                line_items: [
                    // generate inline price and product
                    {
                     price:priceId,
                      quantity: 1,
                    },
                  ],
                success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
              });
            return Response.json({ status: 'success', session });
        }
        if (isMamber.account?.isActive && isMamber.account?.planId !== priceId) { 
            return Response.json({ status: 'error', message: 'User already has an active subscription' });
        }
        const session = await stripe.checkout.sessions.create({
            customer: isMamber.stripeId as string,
            mode: "subscription",
            line_items: [
                {
                 price:priceId,
                  quantity: 1,
                },
              ],
            success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/cancel?session_id={CHECKOUT_SESSION_ID}`,
        });

        return Response.json({ status: 'success', session });
    }
     catch (error) {
        console.error(error);
        return Response.json({ status: 'error', message: 'An error occurred while processing your request.' });
    }
}