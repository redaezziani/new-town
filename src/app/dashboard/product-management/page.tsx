import { BarChartExample } from "@/components/admin/bar-chart"
import { LineChartExample } from "@/components/admin/line-chart"
import { EreaChart } from "@/components/admin/ui/area-chart"
import { CreateItem } from "@/components/admin/ui/create-side-bar"


const MangaManagementPage = async () => {

  return (
    <main
      className='w-full flex  bg-muted  relative justify-start items-start gap-5 flex-col'
    >
      <div className="flex w-full justify-end items-center">
        <CreateItem />
      </div>
      <div className="w-full grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-5 ">
        <article
          className="rounded-lg border border-slate-300/20  p-6 bg-background"
        >
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Profit</p>

            <p className="text-2xl font-medium text-gray-900 dark:text-white">$240.94</p>
          </div>

          <div className="mt-1 flex gap-1 text-green-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>

            <p className="flex gap-2 text-xs">
              <span className="font-medium"> 67.81% </span>

              <span className="text-gray-500 dark:text-gray-400"> Since last week </span>
            </p>
          </div>
        </article>

        <article
          className="rounded-lg border border-slate-300/20  p-6 bg-background"
        >
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Profit</p>

            <p className="text-2xl font-medium text-gray-900 dark:text-white">$240.94</p>
          </div>

          <div className="mt-1 flex gap-1 text-red-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
              />
            </svg>

            <p className="flex gap-2 text-xs">
              <span className="font-medium"> 20.81% </span>
              <span className="text-gray-500 dark:text-gray-400"> Since last week </span>
            </p>
          </div>
        </article>
        <article
          className="rounded-lg border border-slate-300/20  p-6 bg-background"
        >
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Profit</p>

            <p className="text-2xl font-medium text-gray-900 dark:text-white">$240.94</p>
          </div>

          <div className="mt-1 flex gap-1 text-amber-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>

            <p className="flex gap-2 text-xs">
              <span className="font-medium"> 50.81% </span>

              <span className="text-gray-500 dark:text-gray-400"> Since last week </span>
            </p>
          </div>
        </article>
      </div>
      <div className="w-full grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-5 ">
        <div className="w-full col-span-1 overflow-hidden">
          <LineChartExample />
        </div>
        <div className="w-full col-span-1 overflow-hidden">
          <BarChartExample />
        </div>
        <div className="w-full col-span-1 overflow-hidden">
          <LineChartExample />
        </div>
      </div>

      <div className="w-full h-[400px] grid md:grid-cols-2 grid-cols-1 lg:grid-cols-5 gap-5 ">
        <div className="w-full h-[400px] col-span-3 overflow-hidden">
          <EreaChart />
        </div>
        <div className="w-full col-span-2 overflow-hidden">
          <BarChartExample />
        </div>
      </div>

    </main>
  )
}

export default MangaManagementPage