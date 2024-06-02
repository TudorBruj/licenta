import { getProductById } from '@/lib/data/products';
import { TabView, TabPanel } from 'primereact/tabview';
import { notFound } from 'next/navigation';

export async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);
  if (product === null) return notFound();

  return (
    <div className='p-4'>
      <div className='flex flex-col md:flex-row'>
        <img
          src={product.images}
          alt={product.name}
          className='h-96 w-full object-cover md:w-1/2'
        />
        <div className='mt-4 md:ml-4 md:mt-0'>
          <h1 className='text-2xl font-bold'>{product.name}</h1>
          <p className='mt-2 text-lg'>{product.price}</p>
          <p className='mt-2'>{product.category}</p>
          <p className='mt-2'>{product.description}</p>
        </div>
      </div>
      <TabView className='mt-4'>
        <TabPanel header='Reviews'>
          {/* Add your reviews component or code here */}
          <p>No reviews yet.</p>
        </TabPanel>
      </TabView>
    </div>
  );
}

export default ProductPage;
