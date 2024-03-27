import { BarChartExample } from "@/components/admin/bar-chart"
import { LineChartExample } from "@/components/admin/line-chart"
import RadarChartExample from "@/components/admin/radar-chart"
import { CreateItem } from "@/components/admin/ui/create-side-bar"


const MangaManagementPage = async () => {
  return (
    <main
      className='w-full flex lg:px-4  relative justify-start items-start gap-6 flex-col'
    >
       <div className="flex w-full justify-end items-center">
       <CreateItem />
       </div>
      <div className="w-full grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-3 ">
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
    </main>
  )
}

export default MangaManagementPage