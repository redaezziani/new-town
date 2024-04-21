import OredrsTable from "@/components/user/orders/orders-table"

const ProductsPage = async () => {
  return (
    <main
      className='w-full flex z-10  h-fit min-h-screen overflow-hidden  relative justify-start items-start gap-3 flex-col'
    >
     
      <div className="w-full mt-2  flex-col gap-2 justify-start items-start">
      <OredrsTable />
      </div>
     
    </main>
  )
}

export default ProductsPage