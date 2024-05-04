'use client'
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import axios from "axios";

interface data{
    onScrape: (e: Product[]) => void
}
interface Product {
    title: string;
    brand: string;
    selling_price: string;
    old_price: string;
    img: string;
    discount: string;
  }

const ScrapeProduct = ({onScrape}: data) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [search, setSearch] = useState<string>('')
    const [isOpen , setIsOpen] = useState<boolean>(false)
    const [type, setType] = useState<string>('men')
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
        setLoading(true)
        const res = await axios.get(`/api/scrape/products?search=${search}&type=${type}`)
        onScrape(res.data.products)    
        } catch (error) {
            console.log(error)
        }
        finally{
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
                <div
                    className=" w-full flex justify-end items-center gap-2"
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
