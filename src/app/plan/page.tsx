'use client';
import Card from '@/components/for-all/card'
import { Button } from '@/components/ui/button'
import { loadStripe } from "@stripe/stripe-js";
import Stripe from "stripe";
import React from 'react'
import Link from "next/link";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter()
  const handelCheckout = async (priceId: string) => {
    const STRIPE_PK = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!;
    const stripe = await loadStripe(STRIPE_PK);
    // step 3: make a post fetch api call to /checkout-session handler
    const result = await fetch("/api/checkout_sessions", {
      method: "post",
      body: JSON.stringify({ priceId }),
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
    const sessionId = data.session?.id ?? '';
    stripe?.redirectToCheckout({ sessionId });
  };
  return (
    <div className="min-h-screen p-2 relative w-full  flex flex-col justify-center items-center">
      <div className="flex flex-col mt-20 lg:mt-0 gap-3 justify-center items-center w-full md:max-w-4xl">
        <div className="flex w-full flex-col gap-2 justify-center items-center md:w-2/3">
          <h1 className="text-3xl text-center font-bold">
            Update your prodactivity plan
          </h1>
          <p
            className='text-lg text-center mt-4 text-gray-500'
          >
            The <span
              className='text-primary'
            >Free plan</span> is great, but you can do so much more with a paid plan. Upgrade now to unlock all the features!
          </p>
        </div>
        <div className="w-full mt-7 flex justify-center flex-wrap  gap-3 md:justify-start items-center">
          <div className="w-full flex-col gap-2 justify-center items-center md:justify-start md:items-start md:w-1/3">
            <h3
              className='text-lg font-bold'
            >
              🚀 Upgrade to unlock
            </h3>
            <span
              className='flex mt-4 gap-2 items-center'
            >
              <svg
                className='text-teal-500'
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} fill={"none"}>
                <path d="M5 14.5C5 14.5 6.5 14.5 8.5 18C8.5 18 14.0588 8.83333 19 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p
                className=' text-slate-400'
              >
                Unlimited products
              </p>
            </span>
            <span
              className='flex mt-4 gap-2 items-center'
            >
              <svg
                className='text-teal-500'
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} fill={"none"}>
                <path d="M5 14.5C5 14.5 6.5 14.5 8.5 18C8.5 18 14.0588 8.83333 19 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p
                className=' text-slate-400'
              >
                Unlimited orders
              </p>
            </span>
            <span
              className='flex mt-4 gap-2 items-center'
            >
              <svg
                className='text-teal-500'
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} fill={"none"}>
                <path d="M5 14.5C5 14.5 6.5 14.5 8.5 18C8.5 18 14.0588 8.83333 19 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p
                className=' text-slate-400'
              >
                Priority support 24/7
              </p>
            </span>
            <span
              className='flex mt-4 gap-2 items-center'
            >
              <svg
                className='text-teal-500'
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} fill={"none"}>
                <path d="M5 14.5C5 14.5 6.5 14.5 8.5 18C8.5 18 14.0588 8.83333 19 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p
                className=' text-slate-400'
              >
                Full analytics dashboard
              </p>
            </span>
          </div>
          <div className=" max-w-80">
            <Card

            >
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
      </div>
      <div className=" bg-background  lg:bg-transparent  z-50 w-full fixed lg:absolute  top-0 left-0 px-4 py-3 text-white">
        <Link
          href='/'
        className=" w-full flex justify-start  md:px-10 gap-2 items-center">
             <svg 
              className="text-slate-900 ml-3 dark:text-slate-50"
            width="30" height="30" viewBox="0 0 210 210" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M5.32961 43.2093C0 56.0745 0 72.3843 0 105.004C0 137.623 0 153.933 5.32961 166.798C12.4341 183.948 26.0596 197.574 43.2093 204.678C56.0745 210.008 72.3843 210.008 105.004 210.008C137.623 210.008 153.933 210.008 166.798 204.678C183.948 197.574 197.574 183.948 204.678 166.798C209.454 155.269 209.95 140.974 210.002 114.653H131.113L89.679 172.547L97.6252 114.653H59.0292L114.653 37.4608L107.274 94.2197H209.999C209.935 68.6209 209.385 54.5717 204.678 43.2093C197.574 26.0596 183.948 12.4341 166.798 5.32961C153.933 0 137.623 0 105.004 0C72.3843 0 56.0745 0 43.2093 5.32961C26.0596 12.4341 12.4341 26.0596 5.32961 43.2093Z"
                fill="currentColor"
              />
            </svg>
            <h2
              className=" text-slate-900 ml-3 dark:text-slate-50 font-bold"
            >
              zunder io
            </h2>
          </Link>
      </div>
    </div>
  )
}

export default page