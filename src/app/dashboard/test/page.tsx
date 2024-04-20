'use client';
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";




const ProductsPage =  () => {
  const {toast} = useToast()
  const handleToast = () => {
    toast({
      title: "Profile updated successfully",
      description: "Profile updated successfully",
      action: (
        <ToastAction altText="">
          close 
        </ToastAction>
      ),
    })
  };
  return (
    <main
      className='w-full flex z-10  h-fit min-h-screen overflow-hidden  relative justify-start items-start gap-3 flex-col'
    >
      <button
      className="bg-blue-500 text-white px-4 py-2 rounded-md"
      onClick={handleToast}>Toast</button>
    </main>
  )
}

export default ProductsPage