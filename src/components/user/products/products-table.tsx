'use client';
import * as React from 'react';
import { DataTable, ColumnDef } from './table';
import useSWR from 'swr';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2 } from 'lucide-react';

import CreateProducts from './create-products';
import DeleteProducts from './delete-products';

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
  
  const handleSelect = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((i) => i !== id));
    } else {
      setSelected([...selected, id]);
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
            row.getValue('stock') >= 8 ? 'bg-sky-500' : row.getValue('stock') > 0 ? 'bg-amber-500' : 'bg-red-500'}`}
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
    
   
     <DataTable
        //@ts-ignore
        columns={!error && columns}
        data={!error && res.data}
        element={<>
        <DeleteProducts selected={selected} />
        <CreateProducts/>
        </>}
        />
    </div>
  );
};


interface ProductsTableProps {
  selected: string[]
}
const ProductsTableElement = ({ selected }: ProductsTableProps) => {
  return (
    <div className="w-full flex justify-center items-center  gap-4">
      <ProductsTable />
      <DeleteProducts
      selected={selected}
      />
    </div>
  );
}

export default ProductsTable;
