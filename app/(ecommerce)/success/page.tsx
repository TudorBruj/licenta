import Stripe from 'stripe';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { clearCart } from '@/lib/store';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  price: number;
  quantity: number;
}

interface SuccessProps {
  products: Product[];
}

export default function Success({ products }: SuccessProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { session_id } = context.query;

  if (!session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  const session = await stripe.checkout.sessions.retrieve(
    session_id as string,
    {
      expand: ['line_items', 'line_items.data.price.product'],
    }
  );

  const products =
    session.line_items?.data.map((item) => {
      const product = item.price?.product as Stripe.Product;
      return {
        id: item.id,
        name: product.name,
        description: product.description || '',
        images: product.images,
        price: item.price?.unit_amount || 0,
        quantity: item.quantity || 0,
      };
    }) || [];

  return {
    props: {
      products,
    },
  };
};
