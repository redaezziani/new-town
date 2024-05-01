'use client'

import { ProductsShart } from "@/components/prodcuts-ui/charts/product-card-chart-3"
import useSWR from 'swr';
import Counter from "@/components/admin/ui/animation/counter";
import CardSkelton from "@/components/prodcuts-ui/card-skelton";
//@ts-ignore
const fetcher = (url) => fetch(url).then((res) => res.json());
const ProductCardDataC = () => {
    const { data: res, error, } = useSWR('/api/users/customer', fetcher, { refreshInterval: 40000 }) as any
    if (!res) {
        return <CardSkelton />;
    }
    return (
        <article
            className="rounded-md hover:shadow-lg hover:border-slate-300/70 transition-all ease-in-out duration-300 lg:col-span-1 md:col-span-2 col-span-1   gap-2 flex-col  flex justify-end items-start min-h-16  border border-slate-300/30  p-2 bg-background"
        >
            <h2
                className="text-lg justify-start items-center font-medium text-slate-800 dark:text-white flex gap-1"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} fill={"none"}>
                    <path d="M20.774 18C21.5233 18 22.1193 17.5285 22.6545 16.8691C23.7499 15.5194 21.9513 14.4408 21.2654 13.9126C20.568 13.3756 19.7894 13.0714 19 13M18 11C19.3807 11 20.5 9.88071 20.5 8.5C20.5 7.11929 19.3807 6 18 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M3.22596 18C2.47666 18 1.88067 17.5285 1.34555 16.8691C0.250089 15.5194 2.04867 14.4408 2.73465 13.9126C3.43197 13.3756 4.21058 13.0714 5 13M5.5 11C4.11929 11 3 9.88071 3 8.5C3 7.11929 4.11929 6 5.5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M8.0838 15.1112C7.06203 15.743 4.38299 17.0331 6.0147 18.6474C6.81178 19.436 7.69952 20 8.81563 20H15.1844C16.3005 20 17.1882 19.436 17.9853 18.6474C19.617 17.0331 16.938 15.743 15.9162 15.1112C13.5201 13.6296 10.4799 13.6296 8.0838 15.1112Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15.5 7.5C15.5 9.433 13.933 11 12 11C10.067 11 8.5 9.433 8.5 7.5C8.5 5.567 10.067 4 12 4C13.933 4 15.5 5.567 15.5 7.5Z" stroke="currentColor" strokeWidth="1.5" />
                </svg>
                <p
                    className=" capitalize font-semibold"
                >
                    Total Customers
                </p>
            </h2>
            <div className="flex w-full  gap-2 justify-between items-center">
                <div className="flex flex-col gap-2 justify-start items-start">
                    <h3
                        className="  font-bold text-lg text-gray-700 dark:text-white"
                    >
                        <Counter
                            value={res && res.data.total || 0}
                            direction="up"
                        />
                        {" "} USERS
                    </h3>
                    <div
                        className=" flex justify-start items-center gap-1 text-xs text-gray-500 dark:text-gray-400"
                    >
                        <svg
                            className=" text-[#adf802]"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none">
                            <path d="M13.5 13L17 9M14 15C14 16.1046 13.1046 17 12 17C10.8954 17 10 16.1046 10 15C10 13.8954 10.8954 13 12 13C13.1046 13 14 13.8954 14 15Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            <path d="M6 12C6 8.68629 8.68629 6 12 6C13.0929 6 14.1175 6.29218 15 6.80269" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" stroke-width="1.5" />
                        </svg>
                        <span
                            className="font-semibold text-[#adf802] "
                        >
                            +20.81%
                        </span>
                        <span>
                            last week
                        </span>
                    </div>
                </div>
                <div className=" w-[65%]">
                    <ProductsShart />
                </div>
            </div>
        </article>
    )
}

export default ProductCardDataC