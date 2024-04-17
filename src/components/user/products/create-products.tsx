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
    image ?: string
    stock ?: number
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

            const response =await  fetch('/api/products', {
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
                    className='flex gap-2'
                    variant={'outline'}
                >
                    <Package2 className='w-4 h-4' />
                    <span>Create Product</span>
                </Button>
            </SheetTrigger>
            <SheetContent
                side={'right'}
                className='w-full'
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