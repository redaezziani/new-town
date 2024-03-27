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