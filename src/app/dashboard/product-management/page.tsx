import { BarChartExample } from "@/components/admin/bar-chart"
import { LineChartExample } from "@/components/admin/line-chart"
import DataCard from "@/components/admin/ui/analys/data-card"
import { EreaChart } from "@/components/admin/ui/area-chart"


const MangaManagementPage = async () => {

  return (
    <main
      className='w-full flex  h-full  relative justify-start items-start gap-3 flex-col'
    >
      <div className="w-full grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-3 ">
        <DataCard
        titel="Orders"
        price={1200}
        type='increase'
        percentage={20.81}
        descreption='Since last week'
        />

        <DataCard
         titel='Profit' 
         price={240.94} 
         type='none' 
         percentage={50.81} 
         descreption='Since last week'
        />
        <DataCard
        titel="Users"
        price={1200}
        type='decrease'
        percentage={20.81}
        descreption='Since last week'
        />
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

      <div className="w-full h-[400px] grid md:grid-cols-2 grid-cols-1 lg:grid-cols-5 gap-3 ">
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