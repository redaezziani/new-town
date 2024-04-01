import ScrapeProdcut from "@/components/admin/scarpe/scrape-prodcut"

const MangaManagementPage = async () => {
  return (
    <main
      className='w-full flex  bg-muted  relative justify-start items-start gap-5 flex-col'
    >
       <ScrapeProdcut/>
    </main>
  )
}

export default MangaManagementPage