'use client';
import { Suspense, useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

const ProductDetails = () => {
    const router = useRouter()
    
    const query = useSearchParams()
    const product_preview = query.get('product') ?? ''
    const data = [
        '/client/groupe/p3.png',
        '/client/groupe/p4.png',
        '/client/groupe/p7.png',
    ]
    const [product_image, setProductImage] = useState(data[0])

    useEffect(() => {
        router.push(`?product=${product_image}`)
    }, [product_image])

    return (
        <Suspense fallback={<LoadingScreen/>}>
        <article className="w-full max-h-[35rem] col-span-3 gap-1 aspect-[9/12] grid grid-cols-10">
                <div className="grid grid-cols-1 gap-2 w-full max-h-80 overflow-hidden col-span-2 aspect-auto ">
                    {data.map((item, index) => (
                        <Card
                            onClick={() => setProductImage(item)}
                            key={index} className="w-2/3 relative aspect-square rounded-sm bg-muted">
                            <Image
                                className="w-full relative h-full object-cover"
                                src={item}
                                alt="image"
                                fill
                            />
                        </Card>
                    ))}
                </div>
                <Card className="bg-muted rounded-sm relative w-full col-span-6 aspect-auto ">
                    <Image
                        className="w-full h-full relative"
                        src={product_preview}
                        alt="preview"
                        fill
                    />
                </Card>
        </article>
        </Suspense>
    )
}

export default ProductDetails


const LoadingScreen = () => {
    return(
        <article className="w-full max-h-[35rem] col-span-3 gap-1 aspect-[9/12] grid grid-cols-10">
                <div className="grid grid-cols-1 gap-2 w-full max-h-80 overflow-hidden col-span-2 aspect-auto ">
                  <Skeleton
                  style={{animationDelay: '100ms'}}
                  className="w-2/3 relative aspect-square rounded-sm bg-muted" />
                  <Skeleton
                  style={{animationDelay: '140ms'}}
                  className="w-2/3 relative aspect-square rounded-sm bg-muted" />
                  <Skeleton
                  style={{animationDelay: '170ms'}}
                  className="w-2/3 relative aspect-square rounded-sm bg-muted" />
                </div>
                    <Skeleton className="w-full animate-pulse h-full bg-muted rounded-sm relative  col-span-6 aspect-auto " />
        </article>   
    )
}