'use client';

/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import { useState } from 'react';
import { Button } from 'primereact/button';

export default function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleBackButtonClick = () => {
    window.location.href = '/';
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      window.location.href = '/login';
    } else {
    }
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

        <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
          <input
            className='border-gray-200 w-96 border px-6 py-2'
            type='text'
            placeholder='Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className='border-gray-200 w-96 border px-6 py-2'
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className='border-gray-200 w-96 border px-6 py-2'
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className='cursor-pointer bg-main-color px-6 py-6 font-bold text-bg-color'
            type='submit'
          >
            Register
          </button>

          {error && (
            <div className='mt-2 rounded-md px-3 py-1 text-sm text-text-color'>
              {error}
            </div>
          )}
          <Link className='mt-3 text-right text-sm' href={'/login'}>
            Already have an account?
            <span className='underline'> Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
