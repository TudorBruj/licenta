'use client';

import { useAppDispatch } from '@/lib/hooks';
import { incrementQuantity } from '@/lib/store';
import { Button } from 'primereact/button';

export default function AddToCartButton({ product }: { product: any }) {
  const dispatch = useAppDispatch();

  const addToCart = () => {
    dispatch(incrementQuantity({ id: product.id, quantity: 1 }));
  };

  return (
    <Button
      label='Add to Cart'
      icon='pi pi-shopping-cart'
      className='bg-blue-600 text-white hover:bg-blue-700 border-blue-600 rounded border px-6 py-3 font-bold transition'
      onClick={addToCart}
    />
  );
}
