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
import { useToast } from '@/components/ui/use-toast';

const ProductSchema = z.object({
  id: z.string(),
  quantity: z.number(),
  name: z.string(),
  price: z.number(),
  currency: z.string(),
});
type ProductType = z.infer<typeof ProductSchema>;
interface AddOrderItemProps {
  onOrderItemAdd: (product: ProductType) => void;
}
//@ts-ignore
const fetcher = (url) => fetch(url).then((res) => res.json());

const OrderItemSelect: React.FC<AddOrderItemProps> = ({ onOrderItemAdd }) => {
  const { data: products } = useSWR('/api/products', fetcher, { refreshInterval: 20000 }) as { data: ProductType[], error: Error };
  // get just the products that are in stock
  //@ts-ignore
  const inStockProducts = products?.data?.filter(product => product.stock > 0) || [];
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const {toast} = useToast();
  const handleSelectChange = (e: string) => {
    const selectedProductId = e;
    //@ts-ignore
    const selectedProduct = products?.data?.find(product => product.id === selectedProductId) || null;
    setSelectedProduct(selectedProduct);
  };

  const handleOrderItemAdd = () => {
    if (selectedProduct) {
      onOrderItemAdd({ ...selectedProduct, quantity });
      setSelectedProduct(null);
      setQuantity(1); 
      toast({
        title: 'Product added',
        description: `Product added to the order`,
        variant: 'success',
        
      });
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
            <SelectGroup className=''>

              {
                //@ts-ignore
                products && inStockProducts.map((product) => (
                  <SelectItem
                    className=' flex max-w-52 items-start gap-3'
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
          className=' flex justify-center items-center gap-2'
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} fill={"none"}>
            <path d="M13 21H10.9325C8.18162 21 6.8062 21 5.8516 20.2402C4.55052 19.1942 4.46138 17.0725 4.20066 15.5878L3.60807 12.2134C3.50177 11.6081 3.09673 11.0876 2.51841 10.8132C2.37896 10.747 2.27952 10.6235 2.24894 10.4784C2.07874 9.67075 1.6264 8.5469 2.63812 8.10084C2.86684 8 3.17922 8 3.80397 8H7.5M11.5 8H20.196C20.8208 8 21.1332 8 21.3619 8.10084C22.3736 8.5469 21.9213 9.67075 21.7511 10.4784C21.7205 10.6235 21.621 10.747 21.4816 10.8132C21.1491 10.971 20.8738 11.2102 20.6797 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M15 17.5H22M18.5 21L18.5 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M6.5 11L10 3M15 3L17.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Add
        </Button>
      </div>

    </div>
  );
};

export default OrderItemSelect;
