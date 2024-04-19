'use client';

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Package2 } from 'lucide-react'
import React from 'react'
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
import { SingleImageDropzoneUsage } from '@/components/for-all/singel-image-uploader';

type currency = 'USD' | 'EUR' | 'MAD' | 'AED' | 'SAR' | 'QAR' | 'KWD' | 'BHD' | 'OMR'

interface CreateProductsProps {
    name: string
    description: string
    price: number
    currency: currency
    image?: string
    stock?: number
}
const CreateProducts = () => {
    const [image, setImage] = React.useState<string | null>(null);
    const [data, setData] = React.useState<CreateProductsProps>({
        name: '',
        description: '',
        price: 0,
        currency: 'USD',
        image: image ?? '',
        stock: 0
    })
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState<string | null>(null)
    const [isOpened, setIsOpened] = React.useState(false)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [e.target.name]: e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value
        })
    }

    const handleSubmit = async () => {
        try {
            setLoading(true)
            setError(null)
            const schema = z.object({
                name: z.string(),
                description: z.string(),
                price: z.number(),
                stock: z.number(),
                currency: z.string(),

            })
            const result = schema.parse(data)
            const Newdata = {
                name: result.name,
                description: result.description,
                price: result.price,
                currency: result.currency,
                image: image,
                stock: result.stock
            }

            const response = await fetch('/api/products', {
                method: 'POST',
                body: JSON.stringify(Newdata),
            })

            const json = await response.json()
            if (json.status === 'error') {
                setError(json.message)
            }
            if (json.status === 'success') {
                setData({
                    name: '',
                    description: '',
                    price: 0,
                    currency: 'USD',
                    image: '',
                    stock: 0
                })
                setIsOpened(false)
            }


        } catch (error) {
            if (error instanceof z.ZodError) {
                console.log(error.errors)
            }

        }
        finally {
            setLoading(false)
        }
    }

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
                     >Create Product</span>
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
                    onSubmit={handleSubmit}
                    className='w-full flex mt-10 flex-col gap-3 justify-start items-start'
                >
                    <div className="w-full gap-2 justify-start items-start">
                        <h2
                            className='text-lg font-semibold'
                        >
                            Create Product
                        </h2>
                        <p
                            className='text-muted-foreground dark:text-muted-foreground text-sm font-normal'
                        >
                            Fill the form below to create a new product
                        </p>
                    </div>
                    <Label
                        className='text-muted-foreground dark:text-muted-foreground mt-5'
                        htmlFor='name'
                    >
                        Name
                    </Label>
                    <Input
                        type='text'
                        name='name'
                        id='name'
                        value={data.name}
                        onChange={handleChange}
                    />
                    <Label
                        className='text-muted-foreground dark:text-muted-foreground '
                        htmlFor='description'
                    >
                        Description
                    </Label>
                    <Input
                        type='text'
                        name='description'
                        id='description'
                        value={data.description}
                        onChange={handleChange}
                    />
                    <Label
                        className='text-muted-foreground dark:text-muted-foreground '
                        htmlFor='price'
                    >
                        Price
                    </Label>
                    <Input
                        type='number'
                        name='price'
                        id='price'
                        value={data.price}
                        onChange={handleChange}
                    />
                    <Label
                        className='text-muted-foreground dark:text-muted-foreground '
                        htmlFor='stock'
                    >
                        Stock
                    </Label>
                    <Input
                        type='number'
                        name='stock'
                        id='stock'
                        value={data.stock}
                        onChange={handleChange}
                    />

                    <Select
                        value={data.currency}
                        //@ts-ignore    
                        onValueChange={(value) => setData({ ...data, currency: value })}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a currency" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>
                                    Currency
                                </SelectLabel>
                                <SelectItem value="USD">
                                    USD
                                </SelectItem>
                                <SelectItem value="EUR">
                                    EUR
                                </SelectItem>
                                <SelectItem value="MAD">
                                    MAD
                                </SelectItem>
                                <SelectItem value="AED">
                                    AED
                                </SelectItem>
                                <SelectItem value="SAR">
                                    SAR
                                </SelectItem>
                                <SelectItem value="QAR">
                                    QAR
                                </SelectItem>
                                <SelectItem value="KWD">
                                    KWD
                                </SelectItem>
                                <SelectItem value="BHD">
                                    BHD
                                </SelectItem>
                                <SelectItem value="OMR">
                                    OMR
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Label
                        className='text-muted-foreground dark:text-muted-foreground '
                        htmlFor='image'
                    >
                        Image
                    </Label>
                    <SingleImageDropzoneUsage
                        onFileChange={(url) => setImage(url)}
                    />
                    <Button
                        onClick={handleSubmit}
                        disabled={loading}
                        isloading={loading}
                        className='w-full mt-5 font-semibold'
                    >
                        {loading ? 'Loading...' : 'create product'}
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default CreateProducts