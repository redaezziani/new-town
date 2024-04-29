import { EreaChart } from "@/components/admin/ui/area-chart"
import PieChartComponent from "@/components/for-all/c"
import DashLineChart from "@/components/for-all/dash-line-chart"
import { LastOrdersTable } from "@/components/for-all/last-orders"
import MixChart from "@/components/for-all/mix-chart"
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
        <div className="w-full hover:shadow-lg hover:border-slate-300/70 transition-all ease-in-out duration-300  p-3 flex justify-start flex-col items-start gap-2 border aspect-square  rounded-none  col-span-1 overflow-hidden">
          <h1
            className="text-lg justify-start items-center font-semibold capitalize text-slate-800 dark:text-white flex gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} fill={"none"}>
              <path d="M9 5L21 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M3 5L5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M9 12L21 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M3 12L5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M9 19L21 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M3 19L5 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            List of Products
          </h1>
          <PieChartComponent />
        </div>
        <div
          className="w-full h-full   hover:shadow-lg hover:border-slate-300/70 transition-all ease-in-out duration-300  flex justify-start items-start gap-2 border rounded-none  col-span-2 overflow-hidden">
          <MixChart />
        </div>
        <div className="w-full min-h-72   hover:shadow-lg hover:border-slate-300/70 transition-all ease-in-out duration-300  flex justify-start flex-col p-3 items-start gap-2 border rounded-none  col-span-2 overflow-hidden">
          <h2>
            Last Orders
          </h2>
          <DashLineChart />
        </div>
      </div>
    </main>
  )
}

export default DashboardPage;