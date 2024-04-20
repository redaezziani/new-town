'use client';

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { z } from 'zod'

const CreateOrderSchema = z.object({
    deliveryId: z.string(),
    name: z.string(),
    address: z.string(),
    phone: z.string(),
    email: z.string(),
    total: z.number(),
    price: z.number(),
    deliveryDate : z.date(),
    orderItems : z.array(z.object({
        productId: z.string(),
        quantity: z.number(),
        price: z.number()
    })),
})
const DelevrySchema = z.object({
    id: z.string(),
    name: z.string(),
})
const ProductSchema = z.object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
    stock: z.number()
})

import useSWR from 'swr';
import { CalendarForm } from './complex-ui/date';
//@ts-ignore
const fetcher = (url) => fetch(url).then((res) => res.json());
type DeliveryType = z.infer<typeof DelevrySchema>
type OrderType = z.infer<typeof CreateOrderSchema>
type ProductType = z.infer<typeof ProductSchema>

const CreateOrder = () => {
    const [isOpened, setIsOpened] = React.useState(false)
    const {data:deliverys} = useSWR('/api/delivery', fetcher,{refreshInterval: 15000 }) as {data:DeliveryType[],error:Error}
    const {data:products} = useSWR('/api/products', fetcher,{refreshInterval: 20000 }) as {data:ProductType[],error:Error}
    console.log(deliverys)
    const [data, setData] = useState<OrderType | null>({
        deliveryId: '',
        name: '',
        address: '',
        phone: '',
        email: '',
        total: 0,
        price: 0,
        orderItems: [],
        deliveryDate : new Date()
    })
    return (
        <Sheet
            open={isOpened}
            onOpenChange={setIsOpened}
            
        >
            <SheetTrigger asChild>
                <Button
                    className='flex gap-2  '
                >
                     <span
                     className='font-semibold lowercase'
                     >Create  Order</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none">
                        <path d="M11 22C10.1818 22 9.40019 21.6698 7.83693 21.0095C3.94564 19.3657 2 18.5438 2 17.1613C2 16.7742 2 10.0645 2 7M11 22L11 11.3548M11 22C11.7248 22 12.293 21.7409 13.5 21.2226M20 7V11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M15 17.5H22M18.5 21L18.5 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M7.32592 9.69138L4.40472 8.27785C2.80157 7.5021 2 7.11423 2 6.5C2 5.88577 2.80157 5.4979 4.40472 4.72215L7.32592 3.30862C9.12883 2.43621 10.0303 2 11 2C11.9697 2 12.8712 2.4362 14.6741 3.30862L17.5953 4.72215C19.1984 5.4979 20 5.88577 20 6.5C20 7.11423 19.1984 7.5021 17.5953 8.27785L14.6741 9.69138C12.8712 10.5638 11.9697 11 11 11C10.0303 11 9.12883 10.5638 7.32592 9.69138Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M5 12L7 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M16 4L6 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                   
                </Button>
            </SheetTrigger>
            <SheetContent
                side={'right'}
                className='w-full p-3'
            >
                <div
                    className='w-full flex mt-10 flex-col gap-3 justify-start items-start'
                >
                    <div className="w-full gap-2 justify-start items-start">
                        <h2
                            className='text-lg font-semibold'
                        >
                            Create Order 
                        </h2>
                        <p
                            className='text-muted-foreground dark:text-muted-foreground text-sm font-normal'
                        >
                            Fill the form below to create a new order
                        </p>
                    </div>
                    <Label
                        className='text-muted-foreground dark:text-muted-foreground mt-5'
                        htmlFor='name'
                    >
                        Name
                    </Label>
                    <Input
                        id='name'
                        value={data?.name}
                        //@ts-ignore
                        onChange={(e) => setData({ ...data, name: e.target.value })}
                        placeholder='Enter your name'
                    />
                    <Label
                        className='text-muted-foreground dark:text-muted-foreground mt-5'
                        htmlFor='address'
                    >
                        Address
                    </Label>
                    <Input
                        id='address'
                        value={data?.address}
                        //@ts-ignore
                        onChange={(e) => setData({ ...data, address: e.target.value })}
                        placeholder='Enter your address'
                    />
                    <Label
                        className='text-muted-foreground dark:text-muted-foreground mt-5'
                        htmlFor='phone'
                    >
                        Phone
                    </Label>
                    <Input
                        id='phone'
                        value={data?.phone}
                        //@ts-ignore
                        onChange={(e) => setData({ ...data, phone: e.target.value })}
                        placeholder='Enter your phone'
                    />
                    <Label
                        className='text-muted-foreground dark:text-muted-foreground mt-5'
                        htmlFor='email'
                    >
                        Email
                    </Label>
                    <Input
                        id='email'
                        value={data?.email}
                        //@ts-ignore
                        onChange={(e) => setData({ ...data, email: e.target.value })}
                        placeholder='Enter your email'
                    />
                    <Label
                        className='text-muted-foreground dark:text-muted-foreground mt-5'
                        htmlFor='total'
                    >
                        Total
                    </Label>
                    <Input
                        id='total'
                        value={data?.total}
                        //@ts-ignore
                        onChange={(e) => setData({ ...data, total: Number(e.target.value) })}
                        placeholder='Enter the total'
                    />
                    <Label
                        className='text-muted-foreground dark:text-muted-foreground mt-5'
                        htmlFor='price'
                    >
                        Price
                    </Label>
                    <Input
                        id='price'
                        value={data?.price}
                        //@ts-ignore
                        onChange={(e) => setData({ ...data, price: Number(e.target.value) })}
                        placeholder='Enter the price'
                    />
                    <Label
                        className='text-muted-foreground dark:text-muted-foreground mt-5'
                        htmlFor='delivery'
                    >
                       Date of delivery
                    </Label>
                    <CalendarForm
                    //@ts-ignore
                    onValueChange={(value) => setData({ ...data, deliveryDate: value })}
                    />
                    <Label
                        className='text-muted-foreground dark:text-muted-foreground mt-5'
                        htmlFor='delivery'
                    >
                        Delivery
                    </Label>

                    <Select
                        value={data?.deliveryId}
                        //@ts-ignore   
                        onValueChange={(e) => setData({ ...data, deliveryId: e })}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a delivery" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                             {
                            //todo: add deliverys
                            //@ts-ignore
                             deliverys&&deliverys.data.map((delivery) => (
                                <SelectItem key={delivery.id} value={delivery.id}>
                                    {delivery.name}
                                </SelectItem>
                            ))}

                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Label
                        className='text-muted-foreground dark:text-muted-foreground mt-5'
                        htmlFor='products'
                    >
                        Products
                    </Label>
                    <Select
                        //@ts-ignore   
                        // fix this to add the next product
                        onValueChange={(e) => setData({ ...data, orderItems: {productId: e, quantity: 1, price: 0} })}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a product" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                             {
                                //todo: add products
                                //@ts-ignore
                                products&&products.data.map((product) => (
                                <SelectItem key={product.id} value={product.id}>
                                    {product.name}
                                </SelectItem>
                            ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Button
                        className='w-full mt-5 font-semibold'
                    >
                        Create Order
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default CreateOrder