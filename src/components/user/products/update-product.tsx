'use client'
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { SingleImageDropzoneUsage } from '@/components/for-all/singel-image-uploader';
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";

type currency = 'USD' | 'EUR' | 'MAD' | 'AED' | 'SAR' | 'QAR' | 'KWD' | 'BHD' | 'OMR'

interface UpdateProducts {
    id: string
    name: string
    description: string
    price: number
    currency: currency
    image?: string
    stock?: number
}

const UpdateProduct = ({ id, name, description, price, currency, image, stock }: UpdateProducts) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [formData, setFormData] = useState<UpdateProducts>({
        id: id,
        name: name,
        description: description,
        price: price,
        currency: currency,
        image: image,
        stock: stock
    })

    const onImageChange = (image: string) => {
        setFormData({
            ...formData,
            image: image
        })
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const {toast} = useToast()
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            setLoading(true)
            if (!id) {
                return
            }
            const res = await fetch(`/api/products/product-update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            const data = await res.json()
            if (data.status === "error") {
                return
            }

            toast({
                variant:'success',
                description:data.message,
                title:'success'
            })
            
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
              
               <svg
               className=" cursor-pointer text-slate-700 dark:text-slate-100 "
               xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={16} height={16} fill={"none"}>
                    <path d="M16.4215 7C16.6828 5.81796 17.5116 3.8044 16.5398 2.73202C15.8765 2 14.6288 2 12.1335 2L11.8665 2C9.37118 2 8.12353 2 7.46018 2.73202C6.4884 3.80441 7.31722 5.81796 7.57854 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M18.0068 14.6526L13.7868 20.3584C12.9774 21.4528 12.5726 22 12 22C11.4274 22 11.0227 21.4528 10.2132 20.3584L5.99325 14.6526C5.31656 13.7377 4.97821 13.2802 5.00109 12.7927C5.02396 12.3052 5.47593 11.7946 6.37986 10.7732C7.25108 9.78884 7.57854 8.76948 7.57854 7.00045L16.4215 7C16.4215 8.76902 16.7493 9.78857 17.6203 10.7731C18.5242 11.7947 18.9761 12.3054 18.9989 12.7929C19.0217 13.2803 18.6834 13.7377 18.0068 14.6526Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M13.5 14C13.0587 14.318 12.5464 14.5 12 14.5M12 14.5C11.4536 14.5 10.9413 14.318 10.5 14M12 14.5L12 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Update the product
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Fill the below to update this product.
                    </AlertDialogDescription>
                    <form
                        className=" w-full mt-2 flex flex-col gap-2 justify-start items-start"
                        onSubmit={handleSubmit}>
                        <img
                            src={formData.image ? formData.image : image}
                            alt="Product Image"
                            className="rounded-md w-20 h-20 object-cover" />
                        <Label
                            className=" w-full"
                            htmlFor="name"
                        >
                            Product Name
                        </Label>
                        <Input
                            defaultValue={name}
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Product Name"
                        />
                        <Label
                            className=" w-full"
                            htmlFor="description"
                        >
                            Product Description
                        </Label>
                        <Textarea
                            defaultValue={description}
                            name="description"
                            value={formData.description}
                            className=" h-32"
                            onChange={handleChange}
                            placeholder="Product Description"
                        />
                        <Label
                            className=" w-full"
                            htmlFor="price"
                        >
                            Product Price
                        </Label>
                        <Input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="Product Price"
                        />
                         <Label
                            className=" w-full"
                            htmlFor="price"
                        >
                           Product  Stock
                        </Label>
                         <Input
                            type="number"
                            name="stock"
                            value={formData.stock}
                            onChange={handleChange}
                            placeholder="Product Stock"
                        />
                         <Label
                            className=" w-full"
                            htmlFor="price"
                        >
                            Product Image
                        </Label>
                        <SingleImageDropzoneUsage onFileChange={onImageChange} />
                        <Select
                            value={formData.currency}
                            //@ts-ignore    
                            onValueChange={(value) => setFormData({ ...formData, currency: value })}
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
                        <AlertDialogFooter
                            className=" w-full flex justify-end items-center gap-2"
                        >
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <Button
                                type="submit"
                                isloading={loading}
                                disabled={loading}
                            >
                                Update Product
                            </Button>
                        </AlertDialogFooter>
                    </form>
                </AlertDialogHeader>

            </AlertDialogContent>
        </AlertDialog>
    )
}

export default UpdateProduct;
