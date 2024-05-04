'use client';
import ScrapeProduct from "@/components/user/scrape/getProducts";
import { useState } from "react";

interface Product {
  title: string;
  brand: string;
  selling_price: string;
  old_price: string;
  img: string;
  discount: string;
}
const ScrapePage = () => {
  const [products, setProducts] = useState<Product[]>([])
  return (
    <main
      className='w-full flex z-10  overflow-hidden  relative justify-start items-start gap-3 flex-col'
    >
      <div className="flex w-full justify-between items-center gap-3 flex-wrap">
        <h1
          className="text-3xl font-bold"
        >
          صفحة الاستخراج
        </h1>
        <ScrapeProduct
          onScrape={(e) => {
            setProducts(e)
          }}
        />
      </div>
      <div className="grid mt-5 w-full grid-cols-1 sm:grid-cols-2 gap-3  md:grid-cols-5">
        {
          products?.length > 0 &&
          products?.map((product: any, index: any) => (
            <div
            key={index}
            className="w-full col-span-1 flex flex-col gap-2 justify-start items-start relative">
              <div className="image w-full flex justify-start items-center relative">
                <img
                  src={product.img}
                  alt={product.title}
                  className="w-full aspect-square object-cover rounded-md"
                />

              </div>
              <div className="flex flex-col py-2 gap-2 justify-start items-start">
                <h2
                  className="text-lg font-bold"
                >
                  {product.title}
                </h2>
                <p
                  className="text-sm"
                >

                  {product.brand}
                </p>
                <p
                  className="text-sm"
                >
                  {product.selling_price}
                </p>
                <p
                  className="text-sm"
                >
                  {product.old_price}
                </p>
                <p
                  className="text-sm"
                >
                  {product.discount}
                </p>
              </div>
            </div>
          ))
        }
      </div>
    </main>
  )
}

export default ScrapePage

