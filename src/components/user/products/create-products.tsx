'use client';

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import React, { useEffect } from 'react'
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
import { Textarea } from '@/components/ui/textarea';

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
    useEffect(() => {
        const listener = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === 'l') {
                setIsOpened(true)
            }
        }
        window.addEventListener('keydown', listener)
        return () => {
            window.removeEventListener('keydown', listener)
        }
    }
        , [])
        useEffect(() => {
            const listener = (e: ClipboardEvent) => {
                navigator.clipboard.readText().then(text => {

                    const clipboardData = JSON.parse(text);
                    const price = parseFloat(clipboardData.price);
                    setData({
                        name: clipboardData.name,
                        description: clipboardData.description,
                        price: price,
                        currency: clipboardData.currency,
                        image: clipboardData.image,
                        stock: 0
                    })

                }).catch(err => {
                   
                });
                // get also the image from the clipboard if exists just a url of the image

               
            };
            
            window.addEventListener('paste', listener);
    
            return () => {
                window.removeEventListener('paste', listener);
            };
        }, []);
    return (
        <Sheet
            open={isOpened}
            onOpenChange={setIsOpened}
        >
            <SheetTrigger asChild>
                <Button
                    className='flex justify-center items-center gap-2  '
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22" fill="none">
                        <path d="M8 16.0001H15.2632C19.7508 16.0001 20.4333 13.1809 21.261 9.06916C21.4998 7.8832 21.6192 7.29022 21.3321 6.89515C21.1034 6.58048 20.7077 6.51645 20 6.50342" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M9 6.5H17M13 10.5V2.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M8 16L5.37873 3.51493C5.15615 2.62459 4.35618 2 3.43845 2H2.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M8.88 16H8.46857C7.10522 16 6 17.1513 6 18.5714C6 18.8081 6.1842 19 6.41143 19H17.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <circle cx="10.5" cy="20.5" r="1.5" stroke="currentColor" stroke-width="1.5" />
                        <circle cx="17.5" cy="20.5" r="1.5" stroke="currentColor" stroke-width="1.5" />
                    </svg>
                    <span
                        className=' lowercase'
                    >
                        منتج جديد
                    </span>


                </Button>
            </SheetTrigger>
            <SheetContent
                side={'right'}
                className='w-full p-3'
            >
                <div
                    onSubmit={handleSubmit}
                    className='w-full flex mt-10 flex-col gap-4 justify-start items-start'
                >
                    <div className="w-full gap-2 justify-start items-start">
                        <h2
                            className='text-lg font-semibold'
                        >
                            إنشاء منتج
                        </h2>
                        <p
                            className=' text-sm font-normal'
                        >
                            قم بملء النموذج أدناه لإنشاء منتج جديد
                        </p>
                    </div>
                    <Label
                        className=' mt-5'
                        htmlFor='name'
                    >
                        الاسم
                    </Label>
                    <Input
                        type='text'
                        name='name'
                        id='name'
                        placeholder='أدخل اسم المنتج...'
                        value={data.name}
                        onChange={handleChange}
                    />
                    <Label
                        className=' '
                        htmlFor='description'
                    >
                        الوصف
                    </Label>
                    <Textarea
                        name='description'
                        id='description'
                        placeholder='أنشئ وصفًا لهذا المنتج...'
                        className=' min-h-32'
                        value={data.description}
                        onChange={(e)=>{
                            setData({
                                ...data,
                                [e.target.name]: e.target.value
                            });
                        }}
                    />
                    <Label
                        className=' '
                        htmlFor='price'
                    >
                        السعر
                    </Label>
                    <Input
                        type='number'
                        name='price'
                        id='price'
                        value={data.price}
                        onChange={handleChange}
                    />
                    <Label
                        className=' '
                        htmlFor='stock'
                    >
                        المخزون
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
                            <SelectValue placeholder="اختر عملة" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>
                                    العملة
                                </SelectLabel>
                                <SelectItem value="USD">
                                    دولار أمريكي
                                </SelectItem>
                                <SelectItem value="EUR">
                                    يورو
                                </SelectItem>
                                <SelectItem value="MAD">
                                    درهم مغربي
                                </SelectItem>
                                <SelectItem value="AED">
                                    درهم إماراتي
                                </SelectItem>
                                <SelectItem value="SAR">
                                    ريال سعودي
                                </SelectItem>
                                <SelectItem value="QAR">
                                    ريال قطري
                                </SelectItem>
                                <SelectItem value="KWD">
                                    دينار كويتي
                                </SelectItem>
                                <SelectItem value="BHD">
                                    دينار بحريني
                                </SelectItem>
                                <SelectItem value="OMR">
                                    ريال عماني
                                </SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Label
                        className=' '
                        htmlFor='image'
                    >
                        الصورة
                    </Label>
                    <SingleImageDropzoneUsage
                        onFileChange={(url) => setImage(url)}
                    />
                    <Button
                        onClick={handleSubmit}
                        disabled={loading}
                        isloading={loading}
                        className='w-full mt-5 '
                    >
                        إنشاء المنتج
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default CreateProducts