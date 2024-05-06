import { useToast } from '@/components/ui/use-toast';
import React from 'react'

interface Product {
    title: string;
    brand: string;
    selling_price: string;
    old_price: string;
    img: string;
    discount: string;
}

const ProductCard = ({ product }: { product: Product }) => {
    // copy the data in  to clipboard
    const {toast } = useToast()
    const onCopy = async () => {
        try {
            const data = {
                name: product.title,
                price: product.selling_price,
                image: product.img,
                currency: 'AED'
            }
            await navigator.clipboard.writeText(JSON.stringify(data));
            toast({
                title: 'تم النسخ',
                description: 'تم نسخ البيانات بنجاح',
                variant: 'success'
            })
        } catch (error) {
            console.error('Copy failed', error);
        }
    }
    return (
        <div className="w-full col-span-1 flex flex-col gap-2 justify-start items-start relative">
            <div className="image w-full flex justify-start items-center relative">
                {product.discount && (<p className="text-sm absolute left-2 top-2 bg-green-500 px-3 py-0.5 rounded text-white ">{product.discount}</p>)}
                <img src={product.img} alt={product.title} className="w-full aspect-square object-cover rounded-md" />
            </div>
            <div className="flex flex-col py-2 gap-2 justify-start items-start">
                <h2 className="text-lg font-bold line-clamp-1">{product.title}</h2>
                <p className="text-sm">{product.brand}</p>
                <p className="text-sm line-through text-destructive">{product.old_price}</p>
                <p className="text-sm text-green-500">{product.selling_price}</p>
                <svg
                    onClick={onCopy}
                    className="cursor-pointer"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} fill={"none"}>
                    <path d="M7.99805 16H11.998M7.99805 11H15.998" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M7.5 3.5C5.9442 3.54667 5.01661 3.71984 4.37477 4.36227C3.49609 5.24177 3.49609 6.6573 3.49609 9.48836L3.49609 15.9944C3.49609 18.8255 3.49609 20.241 4.37477 21.1205C5.25345 22 6.66767 22 9.49609 22L14.4961 22C17.3245 22 18.7387 22 19.6174 21.1205C20.4961 20.241 20.4961 18.8255 20.4961 15.9944V9.48836C20.4961 6.6573 20.4961 5.24177 19.6174 4.36228C18.9756 3.71984 18.048 3.54667 16.4922 3.5" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M7.49609 3.75C7.49609 2.7835 8.2796 2 9.24609 2H14.7461C15.7126 2 16.4961 2.7835 16.4961 3.75C16.4961 4.7165 15.7126 5.5 14.7461 5.5H9.24609C8.2796 5.5 7.49609 4.7165 7.49609 3.75Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
            </div>

        </div>
    )
}

export default ProductCard