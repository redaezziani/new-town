import Image from "next/image";
import fs from "node:fs/promises";
import { getPlaiceholder } from "plaiceholder";
type ProductImageProps = {
    product_preview: string
}

const ProductImage = async ({ product_preview }: ProductImageProps) => {
    const src = `${product_preview}`

    const buffer = await fetch(src).then( async (res) => {
        return Buffer.from(await res.arrayBuffer());

    })


    const { base64 } = await getPlaiceholder(buffer);
    return (
        <div>
            <Image
                className="w-full h-full rounded-md min-h-20 relative object-cover "
                src={product_preview}
                alt="preview"
                fill
                sizes="100%"
                placeholder='blur'
                blurDataURL={base64}
            />
        </div>
    )
}

export default ProductImage