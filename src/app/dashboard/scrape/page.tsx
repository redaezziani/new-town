'use client';
import ScrapeProduct from "@/components/user/scrape/getProducts";
import ProductCard from "@/components/user/scrape/product-card";
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
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <main className='w-full flex z-10 overflow-hidden relative justify-start items-start gap-3 flex-col'>
      <div className="flex w-full py-3 justify-between items-center gap-3 flex-wrap">
        <h1 className="md:text-3xl font-bold">صفحة الاستخراج</h1>
        <ScrapeProduct
          onScrape={(e) => {
            setProducts(e);
            setLoading(false); 
          }}
        />
      </div>
      <div className="grid mt-5 w-full grid-cols-1 sm:grid-cols-2 gap-3 md:grid-cols-5">
        {loading ? ( // Display skeleton while loading is true
          Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="skeleton w-full animate-pulse col-span-1 flex flex-col gap-2 justify-start items-start relative">
              <div className="skeleton-image w-full animate-pulse aspect-square rounded-md">
                <div className="skeleton-image w-full animate-pulse h-full bg-gray-200 rounded-md"></div>
              </div>
              <div className="skeleton-text w-full animate-pulse flex flex-col py-2 gap-2 justify-start items-start">
                <div className="skeleton-title w-full animate-pulse h-4 bg-gray-200 rounded-md"></div>
                <div className="skeleton-brand w-full animate-pulse h-3 bg-gray-200 rounded-md"></div>
                <div className="skeleton-price w-full animate-pulse h-3 bg-gray-200 rounded-md"></div>
                <div className="skeleton-price w-full animate-pulse h-3 bg-gray-200 rounded-md"></div>
                <div className="skeleton-discount w-full animate-pulse h-3 bg-gray-200 rounded-md"></div>
              </div>
            </div>
          ))
        ) : (
          products?.map((product: any, index: any) => (
           <ProductCard key={index} product={product}  />
          ))
        )}
      </div>
    </main>
  );
};

export default ScrapePage;
