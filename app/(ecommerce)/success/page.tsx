'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { clearCart } from '@/lib/store';
import { redirect, useSearchParams } from 'next/navigation';
import { Button } from 'primereact/button';
import { useSession } from 'next-auth/react';
import { useAppDispatch } from '@/lib/hooks';

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

async function saveOrder(products: Product[]) {
  const response = await fetch('/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      products,
    }),
  });
  if (!response.ok) {
    throw new Error('Failed to save order');
  }
}

export default function Success() {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();

  const [products, setProducts] = useState<Product[]>([]);
  const createOrder = useRef(true);

  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  dispatch(clearCart());

  useEffect(() => {
    if (!sessionId) redirect('/');
    fetchStripeProducts(sessionId).then(async (products) => {
      if (session?.user?.id) {
        try {
          if (createOrder.current) await saveOrder(products);
          createOrder.current = false;
        } catch (error) {
          console.error('Failed to save order:', error);
        }
      }
      setProducts(products);
    });
  }, []);

  return (
    <div className='flex min-h-screen flex-col items-center justify-center p-8'>
      <h1 className='mb-8 text-center text-3xl font-bold text-main-color'>
        Thank you for your purchase!
      </h1>
      <ul className='w-full max-w-md space-y-4'>
        {products.map((product) => (
          <li
            key={product.id}
            className='flex items-start space-x-4 rounded-lg border p-4'
          >
            <Image
              src={product.images[0]}
              alt={product.name}
              width={50}
              height={50}
              className='flex-shrink-0'
            />
            <div>
              <h2 className='text-sm font-semibold'>{product.name}</h2>
              <p className='text-gray-600 text-xs'>{product.description}</p>
              <p className='mt-2 text-sm font-bold'>
                ${(product.price / 100).toFixed(2)}
              </p>
              <p className='text-gray-500 text-xs'>
                Quantity: {product.quantity}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <Link href='/'>
        <Button
          label='Continue Shopping'
          className='p-button-rounded p-button-primary mt-8 text-main-color'
        />
      </Link>
    </div>
  );
}
