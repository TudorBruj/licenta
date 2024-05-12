'use client';

import React from 'react';
import { Carousel } from 'primereact/carousel';
import Image from 'next/image';
import { Product } from '@/lib/data/products';

export default function ProductCarousel({ products }: { products: Product[] }) {
  const productTemplate = (product: Product) => {
    return (
      <div className='bg-white dark:bg-gray-900 border-gray-300 dark:border-blue-900/40 m-2 rounded-lg border px-3 py-5 text-center'>
        <div className='mb-3 flex justify-center'>
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
        </div>
        <div>
          <div className='align-center mt-5 flex flex-wrap justify-center gap-2'>
            {product.name}
          </div>
          <h6 className='text-gray-700 dark:text-white/80 mb-3 mt-0 font-medium'>
            ${product.price}
          </h6>
        </div>
      </div>
    );
  };

  return (
    <div className='card'>
      <Carousel
        value={products}
        circular
        autoplayInterval={3000}
        itemTemplate={productTemplate}
      />
    </div>
  );
}
