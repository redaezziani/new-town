import { BarChartExample } from "@/components/admin/bar-chart"
import { LineChartExample } from "@/components/admin/line-chart"
import ProductCardDataA from "@/components/user/products/cards/card-data-1"
import ProductCardDataB from "@/components/user/products/cards/card-data-2"
import ProductCardDataC from "@/components/user/products/cards/card-data-3"


const MangaManagementPage = async () => {

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