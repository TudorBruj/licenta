'use client';

import { getProductById } from '@/lib/data/products';
import { TabView, TabPanel } from 'primereact/tabview';
import { notFound } from 'next/navigation';
import { useAppDispatch } from '@/lib/hooks';
import { Button } from 'primereact/button';

export async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);
  if (product === null) return notFound();

  return (
    <div className='p-4'>
      <div className='flex flex-col md:flex-row md:space-x-8'>
        <div className='w-full flex-shrink-0 md:w-1/3'>
          <div className='bg-gray-100 flex h-80 w-full items-center justify-center overflow-hidden md:h-96 md:w-full'>
            <img
              src={product.images}
              alt={product.name}
              className='h-full w-full object-contain'
            />
          </div>
        </div>
        <div className='mt-4 md:mt-0 md:flex-1'>
          <h1 className='mb-4 text-4xl font-bold'>{product.name}</h1>
          <p className='text-gray-800 mb-2 text-2xl'>${product.price}</p>
          <p className='text-gray-500 mb-4 text-lg'>{product.category}</p>
          <p className='text-md text-gray-700 mb-6'>{product.description}</p>
          <AddToCartButton product={product} />
        </div>
      </div>
      <TabView className='mt-6'>
        <TabPanel header='Reviews'>
          <p>No reviews yet.</p>
        </TabPanel>
      </TabView>
    </div>
  );
}

function AddToCartButton({ product }: { product: any }) {
  const dispatch = useAppDispatch();

  const addToCart = () => {
    dispatch({
      type: 'cart/incrementQuantity',
      payload: { id: product.id, quantity: 1 },
    });
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

export default ProductPage;
