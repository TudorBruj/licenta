import { getProductById } from '@/lib/data/products';
import { TabView, TabPanel } from 'primereact/tabview';
import Image from 'next/image';
import Reviews from '@/components/reviews';
import { notFound } from 'next/navigation';
import AddToCartButton from '@/components/add-to-cart-button';

export default async function ProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await getProductById(id);
  if (!product) notFound();

  return (
    <div className='p-4'>
      <div className='flex flex-col md:flex-row md:space-x-8'>
        <div className='w-full flex-shrink-0 md:w-1/3'>
          <div className='bg-gray-100 flex h-80 w-full items-center justify-center overflow-hidden md:h-96 md:w-full'>
            <Image
              src={product.images}
              alt={product.name}
              className='h-full w-full object-contain'
              width={500}
              height={500}
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
          <Reviews productId={product.id} />
        </TabPanel>
      </TabView>
    </div>
  );
}
