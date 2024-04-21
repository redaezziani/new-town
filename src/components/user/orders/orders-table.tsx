'use client';
import * as React from 'react';
import { DataTable, ColumnDef } from './table';
import useSWR from 'swr';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2 } from 'lucide-react';

import CreateOrders from '@/components/user/orders/create-orders';
import DeleteOrders from '@/components/user/orders/delete-orders';

interface ProductType {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  currency: string;
  deliveryDate: string;
}
//@ts-ignore
const fetcher = (url) => fetch(url).then((res) => res.json());
const OrdersTable = () => {
  const { data: res, error } = useSWR('/api/orders', fetcher, { refreshInterval: 5000 });
  const [selected, setSelected] = React.useState<string[]>([]);
  
  const handleSelect = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((i) => i !== id));
    } else {
      setSelected([...selected, id]);
    }
  }
  // @ts-ignore
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
      cell: ({ row }) => 
      <div
        className=' line-clamp-1 text-slate-600 dark:text-slate-100 max-w-2xl'
      >{row.getValue('name')}</div>,
    },
    ,
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => <div
        className=' text-slate-600 dark:text-slate-100'
      >{row.getValue('email')}</div>,
    },
    {
      accessorKey: 'address',
      header: 'Address',
      cell: ({ row }) => <div
        className='line-clamp-1 text-slate-600 dark:text-slate-100'
      >{row.getValue('address')}</div>,
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
      cell: ({ row }) => <div
        className=' text-slate-600 dark:text-slate-100'
      >{row.getValue('phone')}</div>,
    },
    {
      accessorKey: 'price',
      header: 'Price',
      cell: ({ row }) => <div className='text-slate-600 dark:text-slate-100'>{row.getValue('price')}</div>,
    },
    {
      accessorKey: 'total',
      header: 'Total',
      cell: ({ row }) => <div className='text-slate-600 dark:text-slate-100'>{row.getValue('total')}</div>,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <div
          className={`rounded-full px-1 max-w-20 py-1 text-center text-xs font-semibold text-white
           ${
            // @ts-ignore
            row.getValue('status') =="PENDING" ? 'bg-amber-500' : row.getValue('status') =="PROCESSING"? 'bg-sky-500' : row.getValue('status') =="DELIVERED" ? 'bg-green-500' : 'bg-red-500' }`}
        >
          <p
          className=' lowercase'
          >
          {
            //@ts-ignore
            row.getValue('status')
          }
          </p>
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
    <div className="w-full mt-3 flex justify-start items-start gap-2 flex-col">
    
     
     <DataTable
        //@ts-ignore
        columns={!error && columns}
        data={!error && res.data}
        element={<>
        <DeleteOrders selected={selected} />
        <CreateOrders/>
        </>}
        />
    </div>
  );
};


interface OrdersTableProps {
  selected: string[]
}


export default OrdersTable;
