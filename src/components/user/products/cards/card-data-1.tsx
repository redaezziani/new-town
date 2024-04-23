'use client'
import { ProductsShart } from "@/components/prodcuts-ui/charts/product-card-chart-1"
import z from 'zod'

//http://localhost:3000/api/products/day
/*
const data = {
            todayCount: todayProducts.length,
            last7DaysCount: last7DaysProducts.length,
            todayProducts,
            last7DaysProducts,
            percentage,
             totalTodayPrice,
            totalLast7DaysPrice
}
*/

const ProductCardSchema = z.object({
    data: z.object({
        todayCount: z.number(),
        last7DaysCount: z.number(),
        todayProducts: z.array(z.object({
            id: z.string(),
            price: z.number(),
            createdAt: z.string(),
            product: z.object({
                currency: z.string()
            }),
        })),
        last7DaysProducts: z.array(z.object({
            id: z.string(),
            price: z.number(),
            createdAt: z.string(),
            product: z.object({
                currency: z.string()
            }),
        })),
        percentage: z.number(),
        totalTodayPrice: z.number(),
        totalLast7DaysPrice: z.number()
    })
})
import useSWR from 'swr';
//@ts-ignore
const fetcher = (url) => fetch(url).then((res) => res.json());
type ProductCard = z.infer<typeof ProductCardSchema>

const ProductCardDataA = () => {
    const { data: res, error, } = useSWR('/api/products/day', fetcher, { refreshInterval: 40000 }) as { data: ProductCard, error: any }
    if (error) {
        return <div>error</div>
    }
    console.log(res)
    return (
        <article
            className="rounded-lg hover:shadow-lg hover:border-slate-300/70 transition-all ease-in-out duration-300   gap-2 flex-col  flex justify-start items-start min-h-16  border border-slate-300/30  p-2 bg-background"
        >
            <h2
                className="text-lg justify-start font-medium text-gray-900 dark:text-white flex gap-2"
            >
                Total Orders
                <p
                    className="text-gray-300 dark:text-gray-100  font-normal"
                >
                    /
                </p>
                <span
                    className="text-gray-300 dark:text-gray-100  font-normal"
                >
                    Day
                </span>
            </h2>
            <div className="flex w-full mt-4 gap-2 justify-between items-center">
                <div className="flex flex-col gap-2 justify-start items-start">
                    <h3
                        className="text-2xl  font-bold text-gray-700 dark:text-white"
                    >
                        {res && res.data.totalTodayPrice?.toFixed(2) || 0 } {res && res.data.todayProducts[0].product.currency}
                    </h3>
                    <div
                        className=" flex justify-start items-center gap-1 text-xs text-gray-500 dark:text-gray-400"
                    >
                        <svg
                            className="stroke-current text-[#0d9488] dark:text-[#0d9488]"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={18} height={18} fill={"none"}>
                            <path d="M3.06164 15.1933L3.42688 13.1219C3.85856 10.6736 4.0744 9.44952 4.92914 8.72476C5.78389 8 7.01171 8 9.46734 8H14.5327C16.9883 8 18.2161 8 19.0709 8.72476C19.9256 9.44952 20.1414 10.6736 20.5731 13.1219L20.9384 15.1933C21.5357 18.5811 21.8344 20.275 20.9147 21.3875C19.995 22.5 18.2959 22.5 14.8979 22.5H9.1021C5.70406 22.5 4.00504 22.5 3.08533 21.3875C2.16562 20.275 2.4643 18.5811 3.06164 15.1933Z" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M7.5 8L7.66782 5.98618C7.85558 3.73306 9.73907 2 12 2C14.2609 2 16.1444 3.73306 16.3322 5.98618L16.5 8" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M15 11C14.87 12.4131 13.5657 13.5 12 13.5C10.4343 13.5 9.13002 12.4131 9 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        {!error &&
                            <span
                                className="font-semibold text-[#0d9488] "
                            >
                                {res && res.data?.percentage?.toFixed(2) || 0}%
                            </span>}
                        <span>
                            last week
                        </span>
                    </div>
                </div>
                <div className=" w-[60%]">
                    <ProductsShart
                        //@ts-ignore
                        data={res && res.data.todayProducts}
                    />
                </div>
            </div>
        </article>
    )
}

export default ProductCardDataA