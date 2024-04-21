'use client';
import { loadStripe } from "@stripe/stripe-js";
import Stripe from "stripe";
import React from 'react'
import { Button } from '../ui/button'
import Link from "next/link";
import { useRouter } from "next/navigation";
import Card from "./card";

const PlansCards = () => {
    const router = useRouter()
    const handelCheckout = async (priceId:string) => {
        const STRIPE_PK = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!;
        const stripe = await loadStripe(STRIPE_PK);
        // step 3: make a post fetch api call to /checkout-session handler
        const result = await fetch("/api/checkout_sessions", {
          method: "post",
          body: JSON.stringify({priceId}),
          headers: {
            "content-type": "application/json",
          },
        });
    
        // step 4: get the data and redirect to checkout using the sessionId
        const data = (await result.json())
        if (data.status === 'error') {
            router.push('/auth/signin')
            return
        }
        const sessionId = data.session?.id??'';
        stripe?.redirectToCheckout({ sessionId });
      };
  return (
    <div className="sm:flex z-10 w-full mt-20 max-w-7xl sm:flex-col sm:align-center p-10">
    <div className="relative self-center bg-slate-200 rounded-lg p-0.5 flex">
        <button type="button"
            className="relative  w-1/2 rounded-md py-2 text-sm font-medium whitespace-nowrap focus:outline-none sm:w-auto sm:px-8 bg-slate-50 border-slate-50 dark:border-slate-300/30  shadow-sm">Monthly
            billing
        </button>
        <button
        type="button"
            className="ml-0.5 relative w-1/2 border rounded-md py-2 text-sm font-medium whitespace-nowrap focus:outline-none sm:w-auto sm:px-8 border-transparent dark:border-slate-300/30 ">Yearly
            billing
        </button>
    </div>
    <div
        className="mt-12 space-y-3 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6 md:max-w-5xl md:mx-auto xl:grid-cols-3">
        <div className="px-6 p-1 z-10 border  rounded-lg shadow-sm divide-y  relative dark:radial-gradient">
            <div className="p-6">
                <h2 className="text-xl leading-6 font-bold text-primary/55 ">
                    Free mamber 
                </h2>
                <p className="mt-2 text-base text-primary leading-tight line-clamp-2">
                    the free plan is for those who want to test the platform before upgrading to a paid plan.
                </p>
                <p className="mt-8">
                    <span className="text-4xl font-bold text-primary/55  tracking-tighter">$0</span>

                    <span className="text-base font-medium text-slate-500">/mo</span>
                </p>
                <Link
                href="/auth/signin"
                    className="mt-8 block w-full   bg-primary text-slate-100 dark:text-slate-900 rounded-md py-2 text-sm font-semibold  text-center">
                    Join as a Free member
                </Link>
            </div>
            <div className="pt-6 pb-8 px-6">
                <h3 className="text-sm font-bold text-primary/55  tracking-wide uppercase">What's included</h3>
                <ul role="list" className="mt-4 space-y-3">
                    <li className="flex space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 h-5 w-5 text-green-400" width="24"
                            height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"
                            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M5 12l5 5l10 -10"></path>
                        </svg>
                        <span className="text-base text-primary">
                            2 products to track included
                        </span>
                    </li>
                    <li className="flex space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 h-5 w-5 text-green-400" width="24"
                            height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"
                            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M5 12l5 5l10 -10"></path>
                        </svg>
                        <span className="text-base text-primary">
                           see all limeted analytics 
                        </span>
                    </li>
                </ul>
            </div>
        </div>
        <div className="px-6 p-1 z-10 border  rounded-lg shadow-sm divide-y  relative dark:radial-gradient">
            <div className="p-6">
                <h2 className="text-xl leading-6 font-bold text-primary/55 ">
                    Premium member
                </h2>
                <p className="mt-2 text-base text-primary leading-tight line-clamp-2">
                    For productive individuals who want to work more efficiently.
                </p>
                <p className="mt-8">
                    <span className="text-4xl font-bold text-primary/55  tracking-tighter">$15</span>
                    <span className="text-base font-medium text-slate-500">/mo</span>
                </p>
                <Button
                    onClick={() => handelCheckout('price_1P6sfAHDE7eZdLsNzNFsZ9xF')}
                    className="mt-8 block w-full  bg-primary rounded-md py-2 text-sm font-semibold  text-center">
                    Join as a Premium member
                </Button>
            </div>
            <div className="pt-6 pb-8 px-6">
                <h3 className="text-sm font-bold text-primary/55  tracking-wide uppercase">What's included</h3>
                <ul role="list" className="mt-4 space-y-3">
                    <li className="flex space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 h-5 w-5 text-green-400" width="24"
                            height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"
                            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M5 12l5 5l10 -10"></path>
                        </svg>
                        <span className="text-base text-primary">
                            10 products to track included
                        </span>
                    </li>
                    <li className="flex space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 h-5 w-5 text-green-400" width="24"
                            height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"
                            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M5 12l5 5l10 -10"></path>
                        </svg>
                        <span className="text-base text-primary">
                            see all analytics
                        </span>
                    </li>
                    <li className="flex space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 h-5 w-5 text-green-400" width="24"
                            height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"
                            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M5 12l5 5l10 -10"></path>
                        </svg>
                        <span className="text-base text-primary">
                            100,000 visits/mo
                        </span>
                    </li>
                    <li className="flex space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 h-5 w-5 text-green-400" width="24"
                            height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"
                            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M5 12l5 5l10 -10"></path>
                        </svg>
                        <span className="text-base text-primary">
                            1,000 conversion actions included
                        </span>
                    </li>
                </ul>
            </div>
        </div>
        <Card>
        <div className=" relative z-20">
            <div className="p-6">
                <h2 className="text-xl leading-6 font-bold text-primary/55 ">
                    Mega member
                </h2>
                <p className="mt-2 text-base text-primary leading-tight line-clamp-2">
                    For teams that need to track multiple products and analyze their performance.
                </p>
                <p className="mt-8">
                    <span className="text-4xl font-bold text-primary/55  tracking-tighter">$30</span>

                    <span className="text-base font-medium text-slate-500">/mo</span>
                </p>
                <Button
                    onClick={() => handelCheckout('price_1P6slOHDE7eZdLsNNRgYrCje')}
                    className="mt-8 block w-full bg-sky-600 hover:bg-sky-600/90 rounded-md py-2 text-sm font-semibold  text-center">
                    Join as a Mega member
                </Button>
            </div>
            <div className="pt-6 pb-8 px-6">
                <h3 className="text-sm font-bold text-primary/55  tracking-wide uppercase">What's included</h3>
                <ul role="list" className="mt-4 space-y-3">
                    <li className="flex space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 h-5 w-5 text-green-400" width="24"
                            height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"
                            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M5 12l5 5l10 -10"></path>
                        </svg>
                        <span className="text-base text-primary">
                            20 products to track included
                        </span>
                    </li>
                    <li className="flex space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 h-5 w-5 text-green-400" width="24"
                            height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"
                            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M5 12l5 5l10 -10"></path>
                        </svg>
                        <span className="text-base text-primary">
                            see all analytics
                        </span>
                    </li>
                    <li className="flex space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 h-5 w-5 text-green-400" width="24"
                            height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"
                            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M5 12l5 5l10 -10"></path>
                        </svg>
                        <span className="text-base text-primary">
                            500,000 visits/mo
                        </span>
                    </li>
                    <li className="flex space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 h-5 w-5 text-green-400" width="24"
                            height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"
                            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M5 12l5 5l10 -10"></path>
                        </svg>
                        <span className="text-base text-primary">
                            5,000 conversion actions included
                        </span>
                    </li>
                    <li className="flex space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 h-5 w-5 text-green-400" width="24"
                            height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"
                            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M5 12l5 5l10 -10"></path>
                        </svg>
                        <span className="text-base text-primary">
                            contact support 24/7
                        </span>
                    </li>
                </ul>
            </div>
        </div>
        </Card>
    </div>
</div>
  )
}

export default PlansCards