'use client';

import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { Paginator } from 'primereact/paginator';
import Image from 'next/image';
import { Product } from '@/lib/data/products';
import { useAppDispatch } from '@/lib/hooks';
import { useRouter } from 'next/navigation';

export default function ProductGrid({ products }: { products: Product[] }) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [first, setFirst] = useState<number>(0);
  const [rows, setRows] = useState<number>(12);

  const onPageChange = (event: { first: number; rows: number }) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  const viewProduct = (id: string) => {
    router.push(`/product/${id}`);
  };

  const gridItem = (product: Product) => {
    return (
      <div
        className='p-2'
        key={product.id}
        onClick={() => viewProduct(product.id)}
      >
        <div className='bg-white dark:bg-gray-900 border-gray-300 dark:border-blue-900/40 rounded-md border p-4'>
          <div className='flex flex-wrap items-center justify-between gap-2'>
            <div className='align-items-center flex gap-2'>
              <i className='pi pi-tag text-gray-700 dark:text-white/80'></i>
              <span className='text-gray-700 dark:text-white/80 font-semibold'>
                {product.category}
              </span>
            </div>
          </div>
          <div className='flex flex-col items-center gap-3 py-5'>
            <div
              style={{ width: '150px', height: '150px', position: 'relative' }}
            >
              <Image
                src={product.images}
                alt='Description of image'
                layout='fill'
                objectFit='contain'
                objectPosition='center'
              />
            </div>
            <div className='w-full overflow-hidden text-ellipsis whitespace-nowrap text-center text-base font-bold'>
              {product.name}
            </div>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-gray-700 dark:text-white/80 text-2xl font-semibold'>
              ${product.price}
            </span>
            <Button
              icon='pi pi-shopping-cart'
              className='p-button-rounded'
              label='Add to Cart'
              onClick={(e) => {
                e.stopPropagation();
                dispatch({
                  type: 'cart/incrementQuantity',
                  payload: { id: product.id, quantity: 1 },
                });
              }}
            ></Button>
          </div>
        </div>
      </div>
    );
  };

  const paginatedProducts = products.slice(first, first + rows);

  return (
    <div>
      <DataView
        value={paginatedProducts}
        itemTemplate={gridItem}
        layout={'grid'}
        pt={{
          grid: {
            className:
              'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
          },
        }}
      />
      <div className='card'>
        <Paginator
          first={first}
          rows={rows}
          totalRecords={products.length}
          onPageChange={onPageChange}
          rowsPerPageOptions={[12, 24, 36]}
        />
      </div>
    </div>
  );
}
