'use client';
import * as React from 'react';
import { DataTable,ColumnDef } from './table';
import useSWR from 'swr';

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
const ProductsTable= () => {
  const { data:res, error } = useSWR('/api/products', fetcher,{refreshInterval: 5000 });
  const columns: ColumnDef<ProductType>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: ({ row }) => <div>{row.getValue('id')}</div>,
    },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => <div>{row.getValue('name')}</div>,
    },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: ({ row }) => <div>{row.getValue('description')}</div>,
    },
    {
      accessorKey: 'price',
      header: 'Price',
      cell: ({ row }) => <div>{row.getValue('price')}</div>,
    },
    {
      accessorKey: 'currency',
      header: 'Currency',
      cell: ({ row }) => <div>{row.getValue('currency')}</div>,
    },
    {
      accessorKey: 'image',
      header: 'Image',
      cell: ({ row }) =>
        // trim the first and last characters from the string
      <img
      className='w-10 h-10'
      alt='product image'
      src={row.getValue('image')} />,
    },
  ];
  if (error) return <div>failed to load</div>
  if (!res) return <div>loading...</div>
  return (  
  <DataTable
  //@ts-ignore
   columns={columns} data={res.data} />);
};

export default ProductsTable;
