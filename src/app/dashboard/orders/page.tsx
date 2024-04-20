
import ProductsTable from "@/components/user/products/products-table"
import CreateOrder from "@/components/user/orders/create-orders"



const ProductsPage = async () => {

  return (
    <main
      className='w-full flex z-10  h-fit min-h-screen overflow-hidden  relative justify-start items-start gap-3 flex-col'
    >
      <div className="flex w-full justify-end items-center">
        <CreateOrder />
      </div>
      <div className="w-full mt-10 flex-col gap-2 justify-start items-start">
      <ProductsTable />
      </div>

      
    </main>
  )
}

export default ProductsPage