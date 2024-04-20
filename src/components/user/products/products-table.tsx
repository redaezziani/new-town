'use client';
import * as React from 'react';
import { DataTable, ColumnDef } from './table';
import useSWR from 'swr';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast"
import { Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog"
import { set } from 'date-fns';

interface ProductType {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  currency: string;

}
//@ts-ignore
const fetcher = (url) => fetch(url).then((res) => res.json());
const ProductsTable = () => {
  const { data: res, error } = useSWR('/api/products', fetcher, { refreshInterval: 5000 });
  const [selected, setSelected] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [confirm, setConfirm] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const { toast } = useToast()
  const handleSelect = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((i) => i !== id));
    } else {
      setSelected([...selected, id]);
    }
  }
  const handelDelete = async () => {
    try {
      if (!confirm) {
        return;
      }
      setLoading(true);     
      const response = await fetch('/api/products', {
        method: 'DELETE',
        body: JSON.stringify({ data: selected }),
      });
      const json = await response.json();
      if (json.status === 'error') {
        console.log(json.message);
      }
      toast({
        title: "Product Deleted",
        description: "Product has been deleted",
      })
      setSelected([]);
      setOpen(false);
      setConfirm(false);
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  }
  const columns: ColumnDef<ProductType>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: ({ row }) => <div
        className=''
      >{row.getValue('id')}</div>,
    },
    {
      accessorKey: 'name',
      header: '',
      cell: ({ row }) => <div
        className=''
      >
        <Checkbox
          checked={selected.includes(row.getValue('id'))}
          onCheckedChange={(e) =>

            handleSelect(row.getValue('id'))
          }

        />
      </div>,
    },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => <div
        className='line-clamp-1 text-slate-600 dark:text-slate-100'
      >{row.getValue('name')}</div>,
    },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: ({ row }) => 
      <div
        className=' line-clamp-1 text-slate-600 dark:text-slate-100 max-w-2xl'
      >{row.getValue('description')}</div>,
    },
    {
      accessorKey: 'price',
      header: 'Price',
      cell: ({ row }) => <div
        className=' text-slate-600 dark:text-slate-100'
      >{row.getValue('price')}</div>,
    },
    {
      accessorKey: 'stock',
      header: 'Stock',
      cell: ({ row }) => <div
        className=' text-slate-600 dark:text-slate-100'
      >{row.getValue('stock')}</div>,
    },
    {
      accessorKey: 'currency',
      header: 'Currency',
      cell: ({ row }) => <div className='text-slate-600 dark:text-slate-100'>{row.getValue('currency')}</div>,
    },
    {
      accessorKey: 'stock',
      header: 'Status',
      cell: ({ row }) => (
        <div
          className={`rounded-full px-1 min-w-20 py-1 text-center text-xs font-semibold text-white
           ${
            // @ts-ignore
            row.getValue('stock') >= 8 ? 'bg-green-500' : row.getValue('stock') > 0 ? 'bg-amber-500' : 'bg-red-500'}`}
        >
          {
            //@ts-ignore
          row.getValue('stock') >= 8 ? 'In Stock' : row.getValue('stock') > 0 ? 'Low Stock' : 'Out of Stock'}
        </div>
      ),
      
    },

  ];
  if (error) return <div>failed to load</div>
  if (!res) return (
    <div
      className=' w-full flex h-96 justify-center gap-2 items-center mt-10 text-slate-400'
    >
      <Loader2
        size='20'
        className=' animate-spin duration-300 ease-out text-slate-400'
      />
      <p>
        Loading...
      </p>
    </div>)
  return (
    <div className="w-full flex justify-start items-start gap-2 flex-col">
      <Dialog
       open={open}
        onOpenChange={() => setOpen(false)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle
              className=' flex justify-start items-center gap-2 w-full text-lg font-semibold text-slate-800'
            >
              <svg
                className=' text-red-600'
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none">
                <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" stroke-width="1.5" />
                <path d="M11.9998 16H12.0088" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M12 13L12 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <span
                className=' text-red-600'
              >
                Delete Products
              </span>
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the selected products, this action cannot be undone.
            </DialogDescription>
            <DialogFooter
            className="sm:justify-start flex gap-2 items-center">
            <Button
              
              isloading={loading}
              variant={'destructive'}
              onClick={() =>
              {
              setConfirm(true)
              handelDelete()
              }
              }
              className=" flex gap-2 w-full mt-4 "
            >
              Delete Products
            </Button>
            </DialogFooter>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <div className="w-full h-14 justify-end items-center flex">
      {selected.length > 0 && (
        <Button
          variant={'outline'}
          onClick={() => setOpen(true)}
          disabled={loading}
          isloading={loading}
          className=" flex gap-2 text-red-600 border-red-600 hover:text-red-600 hover:bg-red-600/5 "
        >
          <svg
          className='text-red-600'
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none">
            <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            <path d="M9.5 12.5C9.99153 11.9943 11.2998 10 12 10M14.5 12.5C14.0085 11.9943 12.7002 10 12 10M12 10V18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M3 5.5H21M16.0555 5.5L15.3729 4.09173C14.9194 3.15626 14.6926 2.68852 14.3015 2.39681C14.2148 2.3321 14.1229 2.27454 14.0268 2.2247C13.5937 2 13.0739 2 12.0343 2C10.9686 2 10.4358 2 9.99549 2.23412C9.89791 2.28601 9.80479 2.3459 9.7171 2.41317C9.32145 2.7167 9.10044 3.20155 8.65842 4.17126L8.05273 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
          </svg>
          Delete
        </Button>
      )}
      </div>
      
     {res.data.length >0&&  <DataTable
        //@ts-ignore
        columns={columns} data={res.data} />}
    </div>
  );
};

export default ProductsTable;
