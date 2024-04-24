'use client'
import { ProductsShart } from "@/components/prodcuts-ui/charts/product-card-chart-2"
import z from 'zod'
const OrdersDelivredCardSchema = z.object({
    data: z.object({
        todayCount: z.number(),
        last7DaysCount: z.number(),
        todayOrders: z.array(z.object({
            id: z.string(),
            price: z.number(),
            createdAt: z.string(),
            total: z.number(),
        })),
        last7DaysOrders: z.array(z.object({
            id: z.string(),
            price: z.number(),
            createdAt: z.string(),
            total: z.number(),
        })),
        percentage: z.number(),
        totalTodayPrice: z.number(),
        totalLast7DaysPrice: z.number(),
        percentageStatus: z.string()
    })
})
import useSWR from 'swr';
import Counter from "@/components/admin/ui/animation/counter";
//@ts-ignore
const fetcher = (url) => fetch(url).then((res) => res.json());
type OrdersCard = z.infer<typeof OrdersDelivredCardSchema>

const ProductCardDataB = () => {
    const { data: res, error, } = useSWR('/api/products/low', fetcher, { refreshInterval: 40000 }) as { data: OrdersCard, error: any }
    return (
        <article
            className="rounded-lg hover:shadow-lg hover:border-slate-300/70 transition-all ease-in-out duration-300   gap-2 flex-col  flex justify-start items-start min-h-16  border border-slate-300/30  p-2 bg-background"
        >
            <h2
                className="text-lg justify-start font-medium text-gray-900 dark:text-white flex gap-2"
            >
                Total Orders Delivered
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
                        <Counter
                        value={res && res.data.totalTodayPrice || 0}
                        direction="up"
                        />
                        {" "}
                         USD
                    </h3>
                    <div
                        className=" flex justify-start items-center gap-1 text-xs text-gray-500 dark:text-gray-400"
                    >
                        <svg
                        className={`w-5 h-5 ${res&&res.data.percentageStatus!='negative'?'text-[#0d9488]':'text-red-500'}`}
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"  fill="none">
                            <path d="M13.5 13L17 9M14 15C14 16.1046 13.1046 17 12 17C10.8954 17 10 16.1046 10 15C10 13.8954 10.8954 13 12 13C13.1046 13 14 13.8954 14 15Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            <path d="M6 12C6 8.68629 8.68629 6 12 6C13.0929 6 14.1175 6.29218 15 6.80269" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" stroke-width="1.5" />
                        </svg>
                        <span
                            className={`font-semibold text-gray-700 dark:text-gray-300 ${res&&res.data.percentageStatus==='positive'?'text-[#0d9488]':'text-red-500'}`}
                        >
                            {res && res.data.percentage.toFixed(2)}%
                        </span>
                        <span>
                            last week
                        </span>
                    </div>
                </div>
               <div className=" w-[60%]">
              {res && res.data.last7DaysOrders.length>1 &&
              <ProductsShart
              //@ts-ignore
              data={res.data.last7DaysOrders} status={res.data.percentageStatus} />}
               </div>
            </div>
        </article>
    )
}

export default ProductCardDataB