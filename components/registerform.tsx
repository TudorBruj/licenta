'use client';

/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import { Button } from 'primereact/button';

export default function RegisterForm() {
  const handleBackButtonClick = () => {
    window.location.href = '/';
  };

  return (
    <div className='grid h-screen place-items-center'>
      <div className='rounded-lg border-t-4 border-main-color p-5 shadow-lg'>
        <div className='mb-4 flex items-center'>
          <Button
            icon='pi pi-arrow-left'
            onClick={handleBackButtonClick}
            className='p-button-text mr-4'
          />
          <h1 className='text-xl font-bold'>Register</h1>
        </div>

        <form className='flex flex-col gap-3'>
          <input
            className='border-gray-200 w-96 border px-6 py-2'
            type='text'
            placeholder='Name'
          />
          <input
            className='border-gray-200 w-96 border px-6 py-2'
            type='text'
            placeholder='Email'
          />
          <input
            className='border-gray-200 w-96 border px-6 py-2'
            type='password'
            placeholder='Password'
          />
          <button className='cursor-pointer bg-main-color px-6 py-6 font-bold text-bg-color'>
            Register
          </button>

          <div className='bg-red-500 mt-2 rounded-md px-3 py-1 text-sm text-bg-color'>
            Error message
          </div>
          <Link className='mt-3 text-right text-sm' href={'/login'}>
            Already have an account?
            <span className='underline'>Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
