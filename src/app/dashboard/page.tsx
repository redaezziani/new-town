import { TableData } from '@/components/admin/data-table'
import { Card } from '@/components/ui/card'
export const revalidate = 60;// 1 minute

const DashBoard = async () => {
  return (
    <main
      className='w-full flex px-4  relative justify-start items-start gap-6 flex-col'
    >
      <section className="w-full mt-10 grid col-span-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ">
        <Card
          className='w-full shadow-none border-slate-300/60  col-span-1 p-2 aspect-video'
        >
          <div className="h-full w-full">
            
          </div>
        </Card>
        <Card
          className='w-full shadow-none border-slate-300/60  col-span-1 p-2 aspect-video'
        >
          <div className="h-full w-full">
           
          </div>
        </Card>
        <Card
          className='w-full shadow-none border-slate-300/60  col-span-1 p-2 aspect-video'
        >
          <div className="h-full w-full">
           
          </div>
        </Card>
      </section>
      <section className="w-full grid grid-cols-1 lg:grid-cols-2 gap-2">
        <Card
          className='w-full shadow-none border-slate-300/60  col-span-2'
        >

          <TableData />
        </Card>
      </section>
    </main>
  )
}

export default DashBoard