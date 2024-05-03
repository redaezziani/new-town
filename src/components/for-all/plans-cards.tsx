'use client';
import { loadStripe } from "@stripe/stripe-js";
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
        // خطوة 3: قم بعمل استدعاء API من نوع POST إلى المعالج /checkout-session
        const result = await fetch("/api/checkout_sessions", {
          method: "post",
          body: JSON.stringify({priceId}),
          headers: {
            "content-type": "application/json",
          },
        });
    
        // خطوة 4: احصل على البيانات وقم بتوجيه المستخدم إلى الخروج باستخدام sessionId
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
            className="relative  w-1/2 rounded-md py-2 text-sm font-medium whitespace-nowrap focus:outline-none sm:w-auto sm:px-8 bg-slate-50 border-slate-50 dark:border-slate-300/30  shadow-sm">الفوترة الشهرية
        </button>
        <button
        type="button"
            className="ml-0.5 relative w-1/2 border rounded-md py-2 text-sm font-medium whitespace-nowrap focus:outline-none sm:w-auto sm:px-8 border-transparent dark:border-slate-300/30 ">الفوترة السنوية
        </button>
    </div>
    <div
        className="mt-12 space-y-3 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6 md:max-w-5xl md:mx-auto xl:grid-cols-3">
        <div className="px-6 p-1 z-10 border  rounded-lg shadow-sm divide-y  relative dark:radial-gradient">
            <div className="p-6">
                <h2 className="text-xl leading-6 font-bold text-slate-100/90 ">
                    عضوية مجانية 
                </h2>
                <p className="mt-2 text-base text-slate-50 leading-tight line-clamp-2">
                    الخطة المجانية لأولئك الذين يرغبون في اختبار المنصة قبل الترقية إلى خطة مدفوعة.
                </p>
                <p className="mt-8">
                    <span className="text-4xl font-bold text-slate-100/90  tracking-tighter">$0</span>

                    <span className="text-base font-medium text-slate-500">/شهر</span>
                </p>
                <Link
                href="/auth/signin"
                    className="mt-8 block w-full hover:bg-white/90   bg-white text-slate-900y text-slate-100 dark:text-slate-900 rounded-md py-2 text-sm font-semibold  text-center">
                    الانضمام كعضو مجاني
                </Link>
            </div>
            <div className="pt-6 pb-8 px-6">
                <h3 className="text-sm font-bold text-slate-100/90  tracking-wide uppercase">ما يتضمنه</h3>
                <ul role="list" className="mt-4 space-y-3">
                    <li className="flex space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 h-5 w-5 text-green-400" width="24"
                            height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"
                            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M5 12l5 5l10 -10"></path>
                        </svg>
                        <span className="text-base text-slate-50">
                            2 منتجات لتتبعها مضمنة
                        </span>
                    </li>
                    <li className="flex space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 h-5 w-5 text-green-400" width="24"
                            height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"
                            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M5 12l5 5l10 -10"></path>
                        </svg>
                        <span className="text-base text-slate-50">
                            اطلع على جميع التحليلات المحدودة 
                        </span>
                    </li>
                </ul>
            </div>
        </div>
        <div className="px-6 p-1 z-10 border  rounded-lg shadow-sm divide-y  relative dark:radial-gradient">
            <div className="p-6">
                <h2 className="text-xl leading-6 font-bold text-slate-100/90 ">
                    عضوية مميزة
                </h2>
                <p className="mt-2 text-base text-slate-50 leading-tight line-clamp-2">
                    للأفراد الإنتاجيين الذين يرغبون في العمل بكفاءة أكبر.
                </p>
                <p className="mt-8">
                    <span className="text-4xl font-bold text-slate-100/90  tracking-tighter">$15</span>
                    <span className="text-base font-medium text-slate-500">/شهر</span>
                </p>
                <Button
                    onClick={() => handelCheckout('price_1P6sfAHDE7eZdLsNzNFsZ9xF')}
                    className="mt-8 block w-full hover:bg-white/90  bg-white text-slate-900 rounded-md py-2 text-sm font-semibold  text-center">
                    الانضمام كعضو مميز
                </Button>
            </div>
            <div className="pt-6 pb-8 px-6">
                <h3 className="text-sm font-bold text-slate-100/90  tracking-wide uppercase">ما يتضمنه</h3>
                <ul role="list" className="mt-4 space-y-3">
                    <li className="flex space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 h-5 w-5 text-green-400" width="24"
                            height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"
                            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M5 12l5 5l10 -10"></path>
                        </svg>
                        <span className="text-base text-slate-50">
                            10 منتجات لتتبعها مضمنة
                        </span>
                    </li>
                    <li className="flex space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 h-5 w-5 text-green-400" width="24"
                            height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"
                            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M5 12l5 5l10 -10"></path>
                        </svg>
                        <span className="text-base text-slate-50">
                            اطلع على جميع التحليلات
                        </span>
                    </li>
                    <li className="flex space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 h-5 w-5 text-green-400" width="24"
                            height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"
                            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M5 12l5 5l10 -10"></path>
                        </svg>
                        <span className="text-base text-slate-50">
                            100,000 زيارة/شهر
                        </span>
                    </li>
                    <li className="flex space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 h-5 w-5 text-green-400" width="24"
                            height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"
                            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M5 12l5 5l10 -10"></path>
                        </svg>
                        <span className="text-base text-slate-50">
                            1,000 إجراء تحويل مضمنة
                        </span>
                    </li>
                </ul>
            </div>
        </div>
        <Card>
        <div className=" relative z-20">
            <div className="p-6">
                <h2 className="text-xl leading-6 font-bold text-slate-100/90 ">
                    عضوية ميجا
                </h2>
                <p className="mt-2 text-base text-slate-50 leading-tight line-clamp-2">
                    للفرق التي تحتاج إلى تتبع منتجات متعددة وتحليل أدائها.
                </p>
                <p className="mt-8">
                    <span className="text-4xl font-bold text-slate-100/90  tracking-tighter">$30</span>

                    <span className="text-base font-medium text-slate-500">/شهر</span>
                </p>
                <Button
                    onClick={() => handelCheckout('price_1P6slOHDE7eZdLsNNRgYrCje')}
                    className="mt-8 block w-full bg-primary hover:bg-primary/90 rounded-md py-2 text-sm font-semibold  text-center">
                    الانضمام كعضو ميجا
                </Button>
            </div>
            <div className="pt-6 pb-8 px-6">
                <h3 className="text-sm font-bold text-slate-100/90  tracking-wide uppercase">ما يتضمنه</h3>
                <ul role="list" className="mt-4 space-y-3">
                    <li className="flex space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 h-5 w-5 text-green-400" width="24"
                            height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"
                            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M5 12l5 5l10 -10"></path>
                        </svg>
                        <span className="text-base text-slate-50">
                            20 منتج لتتبعها مضمنة
                        </span>
                    </li>
                    <li className="flex space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 h-5 w-5 text-green-400" width="24"
                            height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"
                            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M5 12l5 5l10 -10"></path>
                        </svg>
                        <span className="text-base text-slate-50">
                            اطلع على جميع التحليلات
                        </span>
                    </li>
                    <li className="flex space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 h-5 w-5 text-green-400" width="24"
                            height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"
                            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M5 12l5 5l10 -10"></path>
                        </svg>
                        <span className="text-base text-slate-50">
                            500,000 زيارة/شهر
                        </span>
                    </li>
                    <li className="flex space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 h-5 w-5 text-green-400" width="24"
                            height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"
                            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M5 12l5 5l10 -10"></path>
                        </svg>
                        <span className="text-base text-slate-50">
                            5,000 إجراء تحويل مضمنة
                        </span>
                    </li>
                    <li className="flex space-x-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 h-5 w-5 text-green-400" width="24"
                            height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none"
                            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M5 12l5 5l10 -10"></path>
                        </svg>
                        <span className="text-base text-slate-50">
                            الاتصال بالدعم على مدار الساعة طوال أيام الأسبوع
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
