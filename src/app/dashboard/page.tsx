import { BarChartExample } from "@/components/admin/bar-chart"
import { LineChartExample } from "@/components/admin/line-chart"
import DataCard from "@/components/admin/ui/analys/data-card"
import { EreaChart } from "@/components/admin/ui/area-chart"
import ProductCardData from "@/components/user/products/card-data"


const MangaManagementPage = async () => {

  return (
    <main
      className='w-full h-fit z-10 min-h-screen flex mt-4  px-4   relative justify-start items-start gap-3 flex-col'
    >
      <div className="w-full  grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-3 ">
        <ProductCardData />

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

      <div className="w-full  h-[450px] grid md:grid-cols-2 grid-cols-1 lg:grid-cols-5 gap-3 ">
        <div className="w-full h-[450px] col-span-3 overflow-hidden">
          <EreaChart />
        </div>
        <div className="w-full h-[450px] col-span-2 overflow-hidden">
          <BarChartExample />
        </div>
      </div>

    </main>
  )
}

export default MangaManagementPage