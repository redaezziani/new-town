'use client'

import z from 'zod';
import useSWR from 'swr';
import Counter from "@/components/admin/ui/animation/counter";
import { ProductsShart } from '@/components/prodcuts-ui/charts/product-card-chart-2';
import CardSkelton from '@/components/prodcuts-ui/card-skelton';

const OrdersDeliveredCardSchema = z.object({
    data: z.object({
        thisMonthCount: z.number(),
        lastMonthCount: z.number(),
        thisMonthOrders: z.array(z.object({
            id: z.string(),
            price: z.number(),
            createdAt: z.string(),
            total: z.number(),
        })),
        lastMonthOrders: z.array(z.object({
            id: z.string(),
            price: z.number(),
            createdAt: z.string(),
            total: z.number(),
        })),
        percentage: z.number(),
        totalThisMonthPrice: z.number(),
        totalLastMonthPrice: z.number(),
        percentageStatus: z.string()
    })
});
//@ts-ignore
const fetcher = (url) => fetch(url).then((res) => res.json());
type OrdersCard = z.infer<typeof OrdersDeliveredCardSchema>;

const OrdersDeliveredCardData = () => {
    const { data: res, error } = useSWR('/api/products/delivred', fetcher, { refreshInterval: 40000 }) as { data: OrdersCard | undefined, error: any };

    if (error) {
        return <div>Error</div>;
    }

    if (!res) {
        return <CardSkelton />;
    }

    return (
        <article
            className="rounded-md hover:shadow-lg hover:border-slate-300/70 transition-all ease-in-out duration-300 gap-2 flex-col flex justify-end items-start min-h-16 border border-slate-300/30 p-2 bg-background"
        >
            <h2
                className="text-lg justify-start items-center font-medium text-slate-700 dark:text-white flex gap-1"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} fill={"none"}>
                    <path d="M12 2C7.58172 2 4 5.13401 4 9H20C20 5.13401 16.4183 2 12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 17.3333C8 15.4029 8.34533 15 10 15H14C15.6547 15 16 15.4029 16 17.3333V19.6667C16 21.5971 15.6547 22 14 22H10C8.34533 22 8 21.5971 8 19.6667V17.3333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12.008 17.5H11.999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4 9L12 15L20 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p
                    className="capitalize font-semibold"
                >
                    إجمالي المسلم
                </p>
            </h2>
            <div className="flex w-full gap-2 justify-between items-center">
                <div className="flex flex-col gap-2 justify-start items-start">
                    <h3
                        className="text-lg font-bold text-gray-600 dark:text-white"
                    >
                        <Counter
                            value={res.data.totalThisMonthPrice || 0}
                            direction="up"
                        />
                        {" "}
                        دولار
                    </h3>
                    <div
                        className="flex justify-start items-center gap-1 text-xs text-gray-500 dark:text-gray-400"
                    >
                       
                        <span
                            className={`font-semibold text-[#adf802]`}
                        >
                            %{res.data.percentage.toFixed(2)}
                        </span>
                        <span>
                            الشهر الماضي
                        </span>
                    </div>
                </div>
                <div className="w-[65%]">
                    {res.data.thisMonthOrders.length > 0 &&
                        <ProductsShart
                            //@ts-ignore
                            data={res.data.thisMonthOrders} />}
                </div>
            </div>
        </article>
    );
};

export default OrdersDeliveredCardData;
