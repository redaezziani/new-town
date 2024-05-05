'use client'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import axios from "axios";
interface data {
    onScrape: (products: Product[],isPanding?:boolean) => void
}
interface Product {
    title: string;
    brand: string;
    selling_price: string;
    old_price: string;
    img: string;
    discount: string;
}

const ScrapeProduct = ({ onScrape }: data) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [search, setSearch] = useState<string>('')
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [type, setType] = useState<string>('men')
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            onScrape([],true)
            setLoading(true)
            const res = await axios.get(`/api/scrape/products?search=${search}&type=${type}`,{
            })
            onScrape(res.data.products,false)
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
            setIsOpen(false)
        }
    }

    return (
        <AlertDialog
            open={isOpen}
        >
            <AlertDialogTrigger asChild>
                <Button
                    disabled={loading}
                    isloading={loading}
                    onClick={() => setIsOpen(true)}
                >
                    استخراج البيانات
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        استخراج البيانات
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        يمكنك استخراج البيانات من الموقع الذي تريد واضافتها الى قاعدة البيانات
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <form
                    onSubmit={handleSubmit}
                    className="w-full flex flex-col gap-2 justify-start items-start"
                >
                    <Label>
                        البحث عن منتج
                    </Label>
                    <Input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        name="name"
                        placeholder="search for a product..."
                    />
                    <Label
                    htmlFor="type"
                    >
                        نوع المنتج
                    </Label>
                    <RadioGroup
                    onValueChange={(value) => setType(value)}
                    id="type"
                    defaultValue="men">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="men" id="men" />
                            <Label htmlFor="men">
                                رجالي
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="women" id="women" />
                            <Label htmlFor="women">
                                نسائي
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="kids" id="kids" />
                            <Label htmlFor="kids">
                                اطفال
                            </Label>
                        </div>
                    </RadioGroup>

                    <div
                        className=" w-full mt-3 flex justify-end items-center gap-2"
                    >
                        <Button
                            variant={'outline'}
                            onClick={() => setIsOpen(false)}
                        >إلغاء</Button>
                        <Button
                            type="submit"
                            isloading={loading}
                            disabled={loading}
                        >
                            استخراج
                        </Button>
                    </div>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default ScrapeProduct;
