'use client'
import { ProductsShart } from "@/components/prodcuts-ui/charts/product-card-chart-1";
import z from 'zod';
import useSWR from 'swr';
import Counter from "@/components/admin/ui/animation/counter";

const ProductCardSchema = z.object({
    data: z.object({
        thisMonthCount: z.number(),
        lastMonthCount: z.number(),
        thisMonthProducts: z.array(z.object({
            id: z.string(),
            price: z.number(),
            createdAt: z.string(),
            product: z.object({
                currency: z.string()
            }),
        })),
        lastMonthProducts: z.array(z.object({
            id: z.string(),
            price: z.number(),
            createdAt: z.string(),
            product: z.object({
                currency: z.string()
            }),
        })),
        percentage: z.number(),
        totalThisMonthPrice: z.number(),
        totalLastMonthPrice: z.number()
    })
});

type ProductCardData = z.infer<typeof ProductCardSchema>;
//@ts-ignore
const fetcher = (url) => fetch(url).then((res) => res.json());

const ProductCardDataA = () => {
    const { data: res, error } = useSWR('/api/products/month', fetcher, { refreshInterval: 40000 }) as { data: ProductCardData, error: any };

    if (error) {
        return <div>error</div>;
    }

    return (
        <article
            className="rounded-md hover:shadow-lg hover:border-slate-300/70 transition-all ease-in-out duration-300 gap-2 flex-col flex justify-end items-start min-h-16 border border-slate-300/30 p-2 bg-background"
        >
            <h2
                className="text-lg justify-start items-center font-medium text-slate-800 dark:text-white flex gap-1"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} fill={"none"}>
                    <path d="M12.5 22H10.8889C6.69863 22 4.6035 22 3.30175 20.7447C2 19.4895 2 17.4692 2 13.4286V8H22V10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M18 12C15.7909 12 14 13.8089 14 16.0403C14 17.3163 14.5 18.3083 15.5 19.1945C16.2049 19.8191 17.0588 20.8566 17.5714 21.6975C17.8173 22.1008 18.165 22.1008 18.4286 21.6975C18.9672 20.8733 19.7951 19.8191 20.5 19.1945C21.5 18.3083 22 17.3163 22 16.0403C22 13.8089 20.2091 12 18 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M18 16H18.009" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 8L2.96154 5.69231C3.70726 3.90257 4.08013 3.0077 4.8359 2.50385C5.59167 2 6.56112 2 8.5 2H15.5C17.4389 2 18.4083 2 19.1641 2.50385C19.9199 3.0077 20.2927 3.90257 21.0385 5.69231L22 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M12 8V2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M10 12H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <p
                    className="capitalize font-semibold"
                >
                    Total Orders
                </p>
            </h2>
            <div className="flex w-full gap-2 justify-between items-center">
                <div className="flex flex-col gap-2 justify-start items-start">
                    <h3
                        className="text-lg font-bold text-gray-700 dark:text-white"
                    >
                        <Counter
                            value={res && res.data.totalThisMonthPrice || 0}
                            direction="up"
                        />
                        {" "}
                        {res
                            && res.data.thisMonthCount > 0
                            && res.data.thisMonthProducts[0].product.currency || 'USD'
                        }
                    </h3>
                    <div
                        className="flex justify-start items-center gap-1 text-xs text-gray-500 dark:text-gray-400"
                    >
                        <svg
                            className="text-[#0ea5e9]"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none">
                            <path d="M13.5 13L17 9M14 15C14 16.1046 13.1046 17 12 17C10.8954 17 10 16.1046 10 15C10 13.8954 10.8954 13 12 13C13.1046 13 14 13.8954 14 15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M6 12C6 8.68629 8.68629 6 12 6C13.0929 6 14.1175 6.29218 15 6.80269" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                        {!error &&
                            <span
                                className="font-semibold text-[#0ea5e9]"
                            >
                                {res && res.data?.percentage?.toFixed(2) || 0}%
                            </span>}
                        <span>
                            Last Month
                        </span>
                    </div>
                </div>
                <div className="w-[65%]">
                    {res && res.data.thisMonthProducts.length > 1 &&
                        <ProductsShart
                            //@ts-ignore
                            data={res && res.data.thisMonthProducts || []}
                        />}
                </div>
            </div>
        </article>
    );
}

export default ProductCardDataA;
