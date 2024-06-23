import Link from 'next/link';
import { Button } from 'primereact/button';

export default function NotFound() {
  return (
    <div className='bg-gray-100 pb-30 flex min-h-screen flex-col items-center justify-center p-32 text-main-color'>
      <h1 className='mt-0 text-4xl font-bold'>Page Not Found</h1>
      <p className='text-gray-600 mt-2 text-lg'>
        The page you{"'"}re looking for doesn{"'"}t exist.
      </p>
      <Link href='/'>
        <Button
          label='Go Back Home'
          className='p-button-rounded p-button-primary mt-4'
        />
      </Link>
    </div>
  );
}
