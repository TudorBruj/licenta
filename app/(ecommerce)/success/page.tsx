'use client';

import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { clearCart } from '@/lib/store';
import { redirect, useSearchParams } from 'next/navigation';

interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  quantity: number;
}

async function fetchStripeProducts(sessionId: string) {
  const response = await fetch(`/api/stripe/orders?session_id=${sessionId}`);
  if (!response.ok) return [];
  return await response.json();
}

export default function Success() {
  const dispatch = useDispatch();

  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  if (!sessionId) redirect('/');

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  useEffect(() => {
    fetchStripeProducts(sessionId).then((products) => setProducts(products));
  }, [sessionId]);

  return (
    <div className='p-8'>
      <h1 className='mb-8 text-3xl font-bold'>Thank you for your purchase!</h1>
      <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
        {products.map((product) => (
          <div
            key={product.id}
            className='flex flex-col items-center rounded-lg border p-4'
          >
            <Image
              src={product.images[0]}
              alt={product.name}
              width={150}
              height={150}
              className='mb-4'
            />
            <h2 className='text-xl font-semibold'>{product.name}</h2>
            <p className='text-gray-600'>{product.description}</p>
            <p className='mt-4 text-lg font-bold'>
              ${(product.price / 100).toFixed(2)}
            </p>
            <p className='text-gray-500 text-sm'>
              Quantity: {product.quantity}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
