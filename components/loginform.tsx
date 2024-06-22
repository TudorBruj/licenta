'use client';

import { authenticate } from '@/lib/actions';
import Link from 'next/link';
import { Button } from 'primereact/button';
import { useFormState } from 'react-dom';

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <div className='grid h-screen place-items-center'>
      <div className='rounded-lg border-t-4 border-main-color p-5 shadow-lg'>
        <div className='mb-4 flex items-center'>
          <Button
            icon='pi pi-arrow-left'
            onClick={() => {
              window.location.href = '/';
            }}
            className='p-button-text mr-4'
          />
          <h1 className='text-xl font-bold'>Login</h1>
        </div>

        <form action={dispatch} className='flex flex-col gap-3'>
          <input
            className='border-gray-200 w-96 border px-6 py-2'
            type='text'
            placeholder='Email'
            name='email'
          />
          <input
            className='border-gray-200 w-96 border px-6 py-2'
            type='password'
            placeholder='Password'
            name='password'
          />
          <Button className='cursor-pointer bg-main-color px-6 py-6 font-bold text-bg-color'>
            Login
          </Button>

          {errorMessage && (
            <div className='bg-red-500 mt-2 rounded-md px-3 py-1 text-sm'>
              {errorMessage}
            </div>
          )}
          <Link className='mt-3 text-right text-sm' href={'/register'}>
            Don{"'"}t have an account?
            <span className='underline'>Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
