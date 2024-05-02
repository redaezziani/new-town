
import ProductsTable from "@/components/user/products/products-table"
const ProductsPage = async () => {

  return (
    <main
      className='w-full flex z-10  overflow-hidden  relative justify-start items-start gap-3 flex-col'
    >
      <div className="w-full mt-5  flex-col gap-2 justify-start items-start">
      <ProductsTable />
      </div>      
    </main>
  )
}

export default ProductsPage