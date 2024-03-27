
import ProductImage from "../details/product-image"
import { Card } from "@/components/ui/card"

interface IProduct {
    id :string;
    name: string;
    price: number;
    image: string;
}

    
const Products = ({ products }: { products: IProduct[] }) => {
    console.log(products)
    return (
        <div className="w-full  mt-4 grid gap-4  lg:grid-cols-4 md:grid-cols-3 grid-cols-2">
            {products.map((item, index) => (
                <Card
                    key={index}
                    title={`Nike Air Max ${index + 1}`}
                    style={{ animationDelay: `${index * 50}ms` }}
                    className="w-full p-2 relative border-none bg-transparent overflow-hidden shadow-none flex justify-start items-center gap-3 flex-col col-span-1 aspect-square"
                >
                    <div className="w-full h-full aspect-square overflow-hidden rounded-sm relative">
                        <ProductImage
                            product_preview={item.image}
                        />
                    </div>
                    <div className="flex w-full p-2 gap-2 justify-start items-start flex-col">
                        <h3
                            className="text-accent-foreground font-semibold"
                        >
                            Nike Air Max {index + 1}
                        </h3>
                        <p>
                            $200
                        </p>
                    </div>
                </Card>
            ))}
        </div>

    )
}

export default Products;