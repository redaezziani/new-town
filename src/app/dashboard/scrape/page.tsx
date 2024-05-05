'use client';
import ScrapeProduct from "@/components/user/scrape/getProducts";
import ProductCard from "@/components/user/scrape/product-card";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { saveAs } from 'file-saver';
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
  const [loading, setLoading] = useState<boolean>(false);
  const [page , setPage] = useState<number>(1);
  const [currentProducts, setCurrentProducts] = useState<Product[] | null>(null);
  const [productsPerPage, setProductsPerPage] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(0);
  const exportToCSV = () => {
    const csvData = products.map(product => ({
      Title: product.title,
      Brand: product.brand,
      Selling_Price: product.selling_price,
      Old_Price: product.old_price,
      Image: product.img,
      Discount: product.discount
    }));

    const csvHeaders = Object.keys(csvData[0]).join(',') + '\n';
    const csvValues = csvData.map(item => Object.values(item).join(',')).join('\n');
    const csvContent = csvHeaders + csvValues;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'products.csv');
  };

  useEffect(() => {
    console.log('products', products);
    if (products.length > 0) {
      setTotalPages(Math.ceil(products.length / productsPerPage));
    }

    const end = page * productsPerPage;
    const start = end - productsPerPage;
    setCurrentProducts(products.slice(start, end));
    
  }
  , [products, page, productsPerPage]);
  
  return (
    <main className='w-full flex z-10 overflow-hidden relative justify-start items-start gap-3 flex-col'>
      <div className="flex w-full py-3 justify-between items-center gap-3 flex-wrap">
        <h1 className="md:text-3xl font-bold">صفحة الاستخراج</h1>
        <div className="gap-2 flex justify-center items-center">
        {products.length > 0 && (
          <Button
            onClick={exportToCSV}
            variant={'outline'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} fill={"none"}>
              <path d="M12 14.5L12 4.5M12 14.5C11.2998 14.5 9.99153 12.5057 9.5 12M12 14.5C12.7002 14.5 14.0085 12.5057 14.5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M20 16.5C20 18.982 19.482 19.5 17 19.5H7C4.518 19.5 4 18.982 4 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            حفظ البيانات
          </Button>
        )}
        <ScrapeProduct
          onScrape={(e: Product[], isPanding?: boolean) => {
            setProducts(e);
            setLoading(isPanding ? true : false);
          }}
        />
        </div>
        
      </div>
      <div className="w-full flex flex-col justify-start items-start gap-2">
        
        <div className="grid mt-5 w-full grid-cols-1 sm:grid-cols-2 gap-3 md:grid-cols-5">
          {loading ? ( // Display skeleton while loading is true
            Array.from({ length: 5 }).map((_, index) => (
              <div
                style={{
                  animationDelay: `${index * 0.3}s`,
                }}
                key={index} className="skeleton w-full animate-pulse col-span-1 flex flex-col gap-2 justify-start items-start relative">
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
            currentProducts && currentProducts.map((product, index) => (
              <ProductCard
                key={index}
                product={product}
              />
            ))
          )}
        </div>
       {products.length > 0 && ( <div className="flex w-full justify-end items-center gap-2">
        <Button
            onClick={() => {
              const end = page * productsPerPage;
              const start = end - productsPerPage;
              setCurrentProducts(products.slice(start, end));
              setPage(page - 1);
            }}
            variant={'outline'}
            disabled={page === 1}
          >
            السابق
          </Button> 
          <span>{page}</span>
          <Button
            onClick={() => {
              const end = page * productsPerPage;
              const start = end - productsPerPage;
              setCurrentProducts(products.slice(start, end));
              setPage(page + 1);
            }}
            disabled={page === totalPages}
            variant={'outline'}
          >
            التالي
          </Button>
        
        </div>
        )}
      </div>
    </main>
  );
};

export default ScrapePage;
