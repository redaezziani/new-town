import PieChartComponent from "@/components/for-all/c"
import { LastOrdersTable } from "@/components/for-all/last-orders"
import ProductCardDataA from "@/components/user/products/cards/card-data-1"
import ProductCardDataB from "@/components/user/products/cards/card-data-2"
import ProductCardDataC from "@/components/user/products/cards/card-data-3"
import TabsProducts from "@/components/user/products/tabs"
const DashboardPage = async () => {

  return (
    <main
      className='w-full h-fit z-10 min-h-screen flex mt-4  px-4   relative justify-start items-start gap-3 flex-col'
    >
      <div className="w-full  grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-3 ">
        <ProductCardDataA />
        <ProductCardDataB />
        <ProductCardDataC />
      </div>
      <div className="w-full grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-3 ">
        <div className="w-full hover:shadow-lg hover:border-slate-300/70 transition-all ease-in-out duration-300  p-3 flex justify-start flex-col items-start gap-2 border aspect-square  rounded-lg  col-span-1 overflow-hidden">
          <h1
          className="text-lg justify-start font-medium text-gray-900 dark:text-white flex gap-2"
          >
            List of Products
          </h1>
         <PieChartComponent />
        </div>
        <div
        className="w-full h-full   flex justify-start items-start gap-2 border rounded-lg  col-span-2 overflow-hidden">
          <LastOrdersTable />
        </div>
      </div>
    </main>
  )
}

export default DashboardPage ;