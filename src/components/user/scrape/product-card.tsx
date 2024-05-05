import React from 'react'

interface Product {
    title: string;
    brand: string;
    selling_price: string;
    old_price: string;
    img: string;
    discount: string;
}

const ProductCard = ({ product }: { product: Product}) => {
  return (
    <div  className="w-full col-span-1 flex flex-col gap-2 justify-start items-start relative">
    <div className="image w-full flex justify-start items-center relative">
    <p className="text-sm absolute left-2 top-2 bg-green-500 px-3 py-0.5 rounded text-white ">{product.discount}</p>
      <img src={product.img} alt={product.title} className="w-full aspect-square object-cover rounded-md" />
    </div>
    <div className="flex flex-col py-2 gap-2 justify-start items-start">
      <h2 className="text-lg font-bold">{product.title}</h2>
      <p className="text-sm">{product.brand}</p>
      <p className="text-sm line-through text-destructive">{product.old_price}</p>
      <p className="text-sm text-green-500">{product.selling_price}</p>
    </div>
  </div>
  )
}

export default ProductCard