'use client';

import React from 'react';
import { Carousel } from 'primereact/carousel';
import Image from 'next/image';

const imageUrls = [
  '/images/carousel/Nike-logo.jpg',
  '/images/carousel/Adidas_Logo.svg.png',
  '/images/carousel/carhartt-black6539.logowik.com.webp',
  '/images/carousel/50a5636f608af92a133db503a504b3cc.jpg',
];

export default function ProductCarousel() {
  const imageTemplate = (imageUrl: string) => {
    return (
      <div className='bg-white dark:bg-gray-900 border-gray-300 dark:border-blue-900/40 m-2 rounded-lg border px-3 py-5 text-center'>
        <div className='mb-3 flex justify-center'>
          <div
            style={{ width: '150px', height: '150px', position: 'relative' }}
          >
            <Image
              src={imageUrl}
              alt='Brand logo'
              layout='fill'
              objectFit='contain'
              objectPosition='center'
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className='card'>
      <Carousel
        value={imageUrls}
        circular
        autoplayInterval={3000}
        itemTemplate={imageTemplate}
      />
    </div>
  );
}
