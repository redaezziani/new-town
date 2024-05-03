import PieChartComponent from "@/components/for-all/c"
import DashLineChart from "@/components/for-all/dash-line-chart"
import MixChart from "@/components/for-all/mix-chart"
import { Progress } from "@/components/ui/progress"
import ProductCardDataA from "@/components/user/products/cards/card-data-1"
import ProductCardDataB from "@/components/user/products/cards/card-data-2"
import ProductCardDataC from "@/components/user/products/cards/card-data-3"
const DashboardPage = async () => {

  return (
    <main
      className='w-full h-full pb-3 z-10 min-h-screen  flex mt-4  px-4   relative justify-start items-start gap-3 flex-col'
    >
      <div className="w-full  grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-3 ">
        <ProductCardDataA />
        <ProductCardDataB />
        <ProductCardDataC />
      </div>
      <div className="w-full grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-3 ">
        <div className="w-full hover:shadow-lg hover:border-slate-300/70 transition-all ease-in-out duration-300  p-3 flex justify-start flex-col items-start gap-2 border aspect-square  rounded-md col-span-1  lg:col-span-1 overflow-hidden">
          <h1
            className="text-lg justify-start items-center font-semibold capitalize text-slate-700 dark:text-white flex gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} fill={"none"}>
              <path d="M9 5L21 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M3 5L5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M9 12L21 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M3 12L5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M9 19L21 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M3 19L5 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            قائمة المنتجات
          </h1>
          <PieChartComponent />
        </div>
        <div
          className="w-full h-full   hover:shadow-lg hover:border-slate-300/70 transition-all ease-in-out duration-300  flex justify-start items-start gap-x-2 gap-y-4 border rounded-md col-span-1  lg:col-span-2 overflow-hidden">
          <MixChart />
        </div>
      </div>
      <div className="w-full grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-3 ">
        <div className="w-full  h-96   hover:shadow-lg hover:border-slate-300/70 transition-all ease-in-out duration-300  flex justify-start flex-col p-3 items-start gap-x-2 gap-y-4  border rounded-md col-span-1  lg:col-span-2 overflow-hidden">
          <h2
            className=" flex justify-start items-center gap-1 text-lg font-semibold capitalize text-slate-700 dark:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} fill={"none"}>
              <path d="M17.854 12.16C17.471 12.6105 16.7631 12.6138 16.3165 12.1671L11.8329 7.68351C11.3862 7.23686 11.3895 6.529 11.84 6.14596L13.071 5.09939C13.9559 4.34704 15.0349 3.84824 16.2044 3.6509L16.9294 3.52858C17.614 3.41306 18.3339 3.65221 18.8475 4.16577L19.8342 5.15255C20.3478 5.66611 20.5869 6.38601 20.4714 7.07063L20.3491 7.79559C20.1518 8.9651 19.653 10.0441 18.9006 10.929L17.854 12.16Z" stroke="currentColor" strokeWidth="1.5" />
              <path d="M19.5 4.5L21.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M2.5 21.5L4.5 19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6.14596 11.84C6.52901 11.3895 7.23686 11.3862 7.68351 11.8329L12.1671 16.3165C12.6138 16.7631 12.6105 17.471 12.16 17.854L10.929 18.9006C10.0441 19.653 8.9651 20.1518 7.79559 20.3491L7.07063 20.4714C6.38601 20.5869 5.66611 20.3478 5.15255 19.8342L4.16577 18.8475C3.65221 18.3339 3.41306 17.614 3.52858 16.9294L3.6509 16.2044C3.84824 15.0349 4.34704 13.9559 5.09939 13.071L6.14596 11.84Z" stroke="currentColor" strokeWidth="1.5" />
              <path d="M8.5 12.5L10.5 10.5M11.5 15.5L13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            حالة الإيرادات
          </h2>
          <DashLineChart />
        </div>
        <div className="w-full min-h-72    hover:shadow-lg hover:border-slate-300/70 transition-all ease-in-out duration-300  flex justify-start flex-col p-3 items-start gap-x-2 gap-y-4 border rounded-md  col-span-1 overflow-hidden">
          <h2
            className=" flex justify-start items-center gap-1 text-lg font-semibold capitalize text-slate-700 dark:text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} fill={"none"}>
              <path d="M8.64298 3.14559L6.93816 3.93362C4.31272 5.14719 3 5.75397 3 6.75C3 7.74603 4.31272 8.35281 6.93817 9.56638L8.64298 10.3544C10.2952 11.1181 11.1214 11.5 12 11.5C12.8786 11.5 13.7048 11.1181 15.357 10.3544L17.0618 9.56638C19.6873 8.35281 21 7.74603 21 6.75C21 5.75397 19.6873 5.14719 17.0618 3.93362L15.357 3.14559C13.7048 2.38186 12.8786 2 12 2C11.1214 2 10.2952 2.38186 8.64298 3.14559Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M20.788 11.0972C20.9293 11.2959 21 11.5031 21 11.7309C21 12.7127 19.6873 13.3109 17.0618 14.5072L15.357 15.284C13.7048 16.0368 12.8786 16.4133 12 16.4133C11.1214 16.4133 10.2952 16.0368 8.64298 15.284L6.93817 14.5072C4.31272 13.3109 3 12.7127 3 11.7309C3 11.5031 3.07067 11.2959 3.212 11.0972" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M20.3767 16.2661C20.7922 16.5971 21 16.927 21 17.3176C21 18.2995 19.6873 18.8976 17.0618 20.0939L15.357 20.8707C13.7048 21.6236 12.8786 22 12 22C11.1214 22 10.2952 21.6236 8.64298 20.8707L6.93817 20.0939C4.31272 18.8976 3 18.2995 3 17.3176C3 16.927 3.20778 16.5971 3.62334 16.2661" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            حالة المخزون
          </h2>
          <div className="flex gap-2 w-full justify-start items-start  flex-col">
            <div className="flex gap-2 justify-center items-center">
              <h3
                className=" font-semibold text-lg text-slate-500 dark:text-white"
              >
                172/500
              </h3>
              <span
                className="text-xs text-gray-500 dark:text-gray-300 font-semibold"
              >
                نايك إير مونرشي 2024
              </span>
            </div>
            <Progress
              className=" h-2 rounded-md mt-2 "
              value={33} />
          </div>
          <div className="flex gap-2 w-full justify-start items-start flex-col">
            <div className="flex gap-2 justify-center items-center">
              <h3 className="font-semibold text-lg text-slate-500 dark:text-white">
                350/1000
              </h3>
              <span className="text-xs text-gray-500 dark:text-gray-300 font-semibold">
                أديداس الترا بوست 2024
              </span>
            </div>
            <Progress className="h-2 rounded-md mt-2" value={35} />
          </div>
          <div className="flex gap-2 w-full justify-start items-start flex-col">
            <div className="flex gap-2 justify-center items-center">
              <h3 className="font-semibold text-lg text-slate-500 dark:text-white">
                250/600
              </h3>
              <span className="text-xs text-gray-500 dark:text-gray-300 font-semibold">
                أبل أيربودز برو 2024
              </span>
            </div>
            <Progress className="h-2 rounded-md mt-2" value={62} />
          </div>
          <div className="flex gap-2 w-full justify-start items-start flex-col">
            <div className="flex gap-2 justify-center items-center">
              <h3 className="font-semibold text-lg text-slate-500 dark:text-white">
                120/300
              </h3>
              <span className="text-xs text-gray-500 dark:text-gray-300 font-semibold">
                ساعة سامسونج جالاكسي 2024
              </span>
            </div>
            <Progress className="h-2 rounded-md mt-2" value={40} />
          </div>
          <div className="flex gap-2 w-full justify-start items-start flex-col">
            <div className="flex gap-2 justify-center items-center">
              <h3 className="font-semibold text-lg text-slate-500 dark:text-white">
                80/200
              </h3>
              <span className="text-xs text-gray-500 dark:text-gray-300 font-semibold">
                سوني بلايستيشن 5 2024
              </span>
            </div>
            <Progress className="h-2 rounded-md mt-2" value={80} />
          </div>
        </div>
      </div>
    </main>
  )
}

export default DashboardPage;