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
    deliveryDate: z.date(),
    orderItems: z.array(z.object({
        id: z.string(),
        quantity: z.number(),
        name: z.string(), // Added name field to the schema
        price: z.number(), // Added price field to the schema
        currency: z.string(),
    })),
})
const DelevrySchema = z.object({
    id: z.string(),
    name: z.string(),
})
import { useToast } from "@/components/ui/use-toast"

import useSWR from 'swr';
import { CalendarForm } from './complex-ui/date';
import { PhoneInput } from './complex-ui/phone-input';
import OrderItemSelect from './complex-ui/add-product-item';
//@ts-ignore
const fetcher = (url) => fetch(url).then((res) => res.json());
type DeliveryType = z.infer<typeof DelevrySchema>
type OrderType = z.infer<typeof CreateOrderSchema>

const CreateOrder = () => {
    const [isOpened, setIsOpened] = React.useState(false)
    const [isloading, setIsLoading] = React.useState(false)
    const { data: deliverys } = useSWR('/api/delivery', fetcher, { refreshInterval: 15000 }) as { data: DeliveryType[], error: Error }
    const [data, setData] = useState<OrderType | null>({
        deliveryId: '',
        name: '',
        address: '',
        phone: '',
        email: '',

        orderItems: [],
        deliveryDate: new Date()
    })
    //@ts-ignore
    const handleOrderItemAdd = (orderItem) => {
        //@ts-ignore
        setData({ ...data, orderItems: [...data.orderItems, orderItem] })
    }
    
    const { toast } = useToast()

    const handleCreateOrder = async () => {
        try {
            const parsData = CreateOrderSchema.parse(data)
            setIsLoading(true)
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(parsData)
            })
            const result = await response.json()
            if (result.status=='error') {
                toast({
                    variant: "error",
                    title: "Order Not Created",
                    description: "Order has not been created",
                })
                return
            }
            toast({
                variant: "success",
                title: "Order Created",
                description: "Order has been created",
            })
            setData({
                deliveryId: '',
                name: '',
                address: '',
                phone: '',
                email: '',
                orderItems: [],
                deliveryDate: new Date()
            })
            setIsOpened(false)

        } catch (error) {
            console.error(error)
        }
        finally {
            setIsLoading(false)
        }
    }
    const handleKeyDown = React.useCallback((event: KeyboardEvent) => {
        if (event.ctrlKey &&  event.key === 'l') {
            setIsOpened(true);
        }
    }, []);
    
    React.useEffect(() => {
        // display all the navigator events 
        window.addEventListener('keydown', handleKeyDown);
        
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);
    
    
    
    return (
        <Sheet
            open={isOpened}
            onOpenChange={setIsOpened}

        >
            <SheetTrigger asChild>
                <Button
                    className='flex gap-2  '
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={22} height={22} fill={"none"}>
                        <path d="M15.5269 15.9773H18.7662C20.0454 15.9557 21.9996 16.629 21.9996 19.0572C21.9996 21.5767 19.5881 21.9991 18.7662 21.9991C17.9443 21.9991 10.1825 21.9991 7.94527 21.9991C5.43927 21.9991 2.00096 21.4915 2.00098 17.1682L2.00098 8.00293H21.9996V12.5199M15.5269 15.9773C15.5323 15.7634 15.6233 15.5513 15.8001 15.3972L17.5019 13.9769M15.5269 15.9773C15.5212 16.2055 15.613 16.4358 15.8023 16.5997L17.5019 17.9833" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M2.00586 7.9912L2.92739 5.69028C3.67517 3.90211 4.04906 3.00803 4.80692 2.50463C5.56477 2.00122 6.53689 2.00122 8.48112 2.00122H15.5004C17.4447 2.00122 18.4167 2.00122 19.1746 2.50463C19.9325 3.00803 20.3063 3.90211 21.0542 5.69028L22 7.99476" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M11.9629 8.00122V2.00122" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M9.96289 12.0012H13.9629" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <span
                        className=' lowercase'
                    >Create  Order</span>


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
                    <PhoneInput
                        //@ts-ignore
                        onChange={(value) => setData({ ...data, phone: value })}
                        className='w-full'
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
                                    deliverys && deliverys.data.map((delivery) => (
                                        <SelectItem key={delivery.id} value={delivery.id}>
                                            {delivery.name}
                                        </SelectItem>
                                    ))}

                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <OrderItemSelect
                        //@ts-ignore
                        onOrderItemAdd={handleOrderItemAdd} />
                    <Button
                        onClick={handleCreateOrder}
                        isloading={isloading}
                        disabled={isloading}
                        className='w-full mt-5 '
                    >
                        Create Order
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default CreateOrder