'use client';
import { useToast } from "@/components/ui/use-toast";

import ProductsTable from "@/components/user/products/products-table"



const ProductsPage = async () => {
  const {toast} = useToast()
  const handleToast = () => {
    toast({
      title: "An error occurred",
      description: "Something went wrong",
    });
  };
  return (
    <main
      className='w-full flex z-10  h-fit min-h-screen overflow-hidden  relative justify-start items-start gap-3 flex-col'
    >
     
      <div className="w-full mt-2  flex-col gap-2 justify-start items-start">
      <ProductsTable />
      </div>
       <button
        onClick={handleToast}
        className="bg-primary text-white px-4 py-2 rounded-md"
      >
        Show Toast
      </button>
    </main>
  )
}

export default ProductsPage