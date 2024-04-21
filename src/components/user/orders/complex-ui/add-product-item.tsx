import React, { useState } from 'react';
import { z } from 'zod';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useSWR from 'swr';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const ProductSchema = z.object({
  id: z.string(),
  quantity: z.number(),
  name: z.string(), // Added name field to the schema
  price: z.number(), // Added price field to the schema
  currency: z.string(), // Added currency field to the schema
});




type ProductType = z.infer<typeof ProductSchema>;

interface AddOrderItemProps {
  onOrderItemAdd: (product: ProductType) => void;
}
//@ts-ignore
const fetcher = (url) => fetch(url).then((res) => res.json());

const OrderItemSelect: React.FC<AddOrderItemProps> = ({ onOrderItemAdd }) => {
  const { data: products } = useSWR('/api/products', fetcher, { refreshInterval: 20000 }) as { data: ProductType[], error: Error };
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const handleSelectChange = (e:string) => {
    const selectedProductId = e;
    //@ts-ignore
    const selectedProduct = products?.data?.find(product => product.id === selectedProductId) || null;
    setSelectedProduct(selectedProduct);
  };

  const handleOrderItemAdd = () => {
    if (selectedProduct) {
        onOrderItemAdd({ ...selectedProduct, quantity });
      setSelectedProduct(null);
      setQuantity(1); // Reset quantity after adding the product
    }
  };

  return (
    <div className='flex flex-col gap-4 w-full'>
      <Label className='text-muted-foreground dark:text-muted-foreground mt-5' htmlFor='products'>
        Products
      </Label>
      <div className="flex justify-start items-center gap-3">
        <Select
          onValueChange={(e) => handleSelectChange(e)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a product" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup className='w-full'>
                
              {
              //@ts-ignore
              products && products.data.map((product) => (
                <SelectItem
                  className='w-full flex items-start gap-3'
                  key={product.id}
                  value={product.id}
                >
                  <div className='flex text-xs flex-col gap-1'>
                    <p
                    className=' line-clamp-1'
                    >{product.name}</p>
                    <p className='text-muted-foreground dark:text-muted-foreground text-xs'>
                      {product.price} {product.currency}
                    </p>
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input
          id='quantity'
          type='number'
          min={1}
          //@ts-ignore
          max={selectedProduct?.stock}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          placeholder='Enter the quantity'
        />
        <Button
        onClick={handleOrderItemAdd}
        >
          Add
        </Button>
      </div>
     
    </div>
  );
};

export default OrderItemSelect;
