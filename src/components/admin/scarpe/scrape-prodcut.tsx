'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Download, Eraser } from "lucide-react";
import { useState } from "react";
import { Product } from "@/app/types/scrape";
import { useToast } from "@/components/ui/use-toast";
import { DataTable } from "../table";
import { Checkbox } from "@/components/ui/checkbox";
export interface ColumnDef {
    accessorKey: string;
    header: string;
    cell: ({ row }: { row: any }) => JSX.Element;
}
/*
export interface Product {
    id: number;
    image: string;
    title: string;
    rating: string;
    regularPrice: string;
    discountedPrice: string;
    stockAvailability: string;
    otherSellersPrice: string;
    shipping: string;
    prime: boolean;
    sponsored: boolean;
    remainingStock: string;
    certification: string;
    productURL: string; 
}
*/
const ScrapeProdcut = () => {
    const [search, setSearch]= useState('')
    const [isloading, setIsloading]= useState(false)
    const [products, setProducts]= useState<Product[]>([])
    const {toast} = useToast()
    const handelSubmite= async ()=>{
        try {
            setIsloading(true)
            const res = await axios.get(`http://localhost:3000/api/scrape/product?_search=${search}&_limit=6`)
            if (res.data.status==="error") {
                toast({
                    variant:'destructive',
                    title:'Error',
                    description:res.data.message
                })
            }
            else{
                setProducts(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
        finally{
            setIsloading(false)
            setSearch('')
        }
    }
    const columns: ColumnDef[] = [
        {
            accessorKey: 'id',
            header: 'ID',
            cell: ({ row }: { row: any }) =>
            <div>
                {row.getValue('id')}
            </div>,
        },
        {
            accessorKey: 'checkbox',
            header: '',
            cell: ({ row }: { row: any }) =>
            <div>
                <Checkbox />
            </div>,
        },
        {
            accessorKey: 'image',
            header: 'Image',
            cell: ({ row }: { row: any }) =>
            <div>
                <img src={row.getValue('image')} alt="product" className=" h-10 w-10 object-cover rounded" />
            </div>,
        },
        {
            accessorKey: 'title',
            header: 'Title',
            cell: ({ row }: { row: any }) =>
            <div
            className=" truncate text-slate-800 dark:text-slate-50 lg:w-72"
            >
                {row.getValue('title')}
            </div>,
        },
        {
            accessorKey: 'rating',
            header: 'Rating',
            cell: ({ row }: { row: any }) =>
            <div
            className=" truncate text-slate-800 dark:text-slate-50 w-32"
            >
                {row.getValue('rating')}
            </div>,
        },
        {
            accessorKey: 'regularPrice',
            header: 'Regular Price',
            cell: ({ row }: { row: any }) =>
            <div
            className="text-slate-800 dark:text-slate-50"
            >
                {row.getValue('regularPrice')}
            </div>,
        },
        {
            accessorKey: 'discountedPrice',
            header: 'Discounted Price',
            cell: ({ row }: { row: any }) =>
            <div
            className="text-slate-800 dark:text-slate-50"
            >
                {row.getValue('discountedPrice')}
            </div>,
        },
        {
            accessorKey: 'stockAvailability',
            header: 'Stock Availability',
            cell: ({ row }: { row: any }) =>
            <div
            className=" truncate w-32 text-slate-800 dark:text-slate-50"
            >
                {row.getValue('stockAvailability')}
            </div>,
        },
        {
            accessorKey: 'otherSellersPrice',
            header: 'Other Sellers Price',
            cell: ({ row }: { row: any }) =>
            <div
            className="text-slate-800 dark:text-slate-50"
            >
                {row.getValue('otherSellersPrice')}
            </div>,
        },
        {
            accessorKey: 'shipping',
            header: 'Shipping',
            cell: ({ row }: { row: any }) =>
            <div
            // if he include :paid
            className={` truncate rounded-md  p-1  w-13 ${!row.getValue('shipping').includes('Paid') ? 'text-green-500 bg-green-500/15 ' : 'text-red-500 bg-red-500/15'}`}
            >
                {row.getValue('shipping')}
            </div>,
        },
        {
            accessorKey: 'prime',
            header: 'Prime',
            cell: ({ row }: { row: any }) =>
            <div
            className="text-slate-800 dark:text-slate-50"
            >
                {row.getValue('prime')}
            </div>,
        },
        {
            accessorKey: 'sponsored',
            header: 'Sponsored',
            cell: ({ row }: { row: any }) =>
            <div
            className="text-slate-800 dark:text-slate-50"
            >
                {row.getValue('sponsored')}
            </div>,
        },
        {
            accessorKey: 'remainingStock',
            header: 'Remaining Stock',
            cell: ({ row }: { row: any }) =>
            <div
            className=" truncate text-slate-800 dark:text-slate-50 w-20"
            >
                {row.getValue('remainingStock')}
            </div>,
        },
        
    ];
  return (
    <div
    className=" flex justify-start items-center gap-3 flex-col w-full"
    >
        <div className="flex w-full justify-between items-center">
            <div className="flex gap-2 justify-start items-center">
                <Input
                className=" lg:w-96 w-1/2"
                placeholder="Enter product name..."
                name="search"
                value={search}
                disabled={isloading}
                onChange={(e)=>setSearch(e.target.value)}
                />
                <Button
                isloading={isloading}
                disabled={isloading}
                onClick={handelSubmite}
                >
                    scrape
                </Button>
            </div>
            <div className="flex justify-start items-center gap-3">
                <Button
                onClick={()=>setProducts([])}
                variant={'destructive'}
                >
                    <Eraser
                    size={16}
                    className=" mr-2 stroke-1 "
                    />
                    Clear
                </Button>
                <Button
                variant={'outline'}
                >
                     <Download
                    size={16}
                    className=" mr-2 text-[#186e4a] stroke-1 "
                    />
                    Save
                </Button>
            </div>
        </div>
        <div className="w-full mt-4 bg-background rounded-xl ">
            {products.length>0 &&
            <DataTable
            total={products.length}
            data={products} columns={columns}
            />
            }
        </div>
    </div>
  )
}

export default ScrapeProdcut