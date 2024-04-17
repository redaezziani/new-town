import { ProductsShart } from "@/components/prodcuts-ui/charts/product-card-chart-1"

const ProductCardDataA = () => {
    return (
        <article
            className="rounded-lg hover:shadow-lg hover:border-slate-300/70 transition-all ease-in-out duration-300   gap-2 flex-col  flex justify-start items-start min-h-16  border border-slate-300/30  p-2 bg-background"
        >
            <h2
                className="text-lg justify-start font-medium text-gray-900 dark:text-white flex gap-2"
            >
                Total Poructs
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
                        1200 €
                    </h3>
                    <div
                        className=" flex justify-start items-center gap-1 text-xs text-gray-500 dark:text-gray-400"
                    >
                        <svg
                        className=" text-green-500"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"  fill="none">
                            <path d="M13.5 13L17 9M14 15C14 16.1046 13.1046 17 12 17C10.8954 17 10 16.1046 10 15C10 13.8954 10.8954 13 12 13C13.1046 13 14 13.8954 14 15Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            <path d="M6 12C6 8.68629 8.68629 6 12 6C13.0929 6 14.1175 6.29218 15 6.80269" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" stroke-width="1.5" />
                        </svg>
                        <span
                            className="font-semibold text-green-500 "
                        >
                            +20.81%
                        </span>
                        <span>
                            last week
                        </span>
                    </div>
                </div>
               <div className=" w-[60%]">
               <ProductsShart />
               </div>
            </div>
        </article>
    )
}

export default ProductCardDataA