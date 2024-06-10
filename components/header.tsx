'use client';

import Link from 'next/link';
import { Big_Shoulders_Text } from 'next/font/google';
import { useAppSelector } from '@/lib/hooks';
import SideBar from './sidebar';
import { Button } from 'primereact/button';
import { signOut } from '@/lib/auth';

const font = Big_Shoulders_Text({ subsets: ['latin'] });
const linkStyle = 'text-main-color font-bold ' + font.className;

export default function Header() {
  const cartCount = useAppSelector((state) => state.cart.length);

  return (
    <header>
      <div className='sticky m-auto flex w-full items-center justify-between px-10 py-6'>
        <Link
          href='/'
          className={
            'text-2xl font-bold uppercase text-main-color ' + font.className
          }
        >
          Logo
        </Link>
        <div className='flex justify-center gap-4'>
          <Link href=" /category/women's clothing" className={linkStyle}>
            Woman
          </Link>
          <Link href=" /category/men's clothing" className={linkStyle}>
            Man
          </Link>
          <Link href=' /category/Accessories ' className={linkStyle}>
            Accessories
          </Link>
        </div>
        <div className='flex'>
          <a href='/admin'>
            <Button
              icon='pi pi-user text-main-color text-2xl'
              style={{ fontSize: '2rem' }}
            />
          </a>
          <Button
            icon='pi pi-sign-out text-main-color text-2xl'
            style={{ fontSize: '2rem' }}
            onClick={async () => {
              await signOut();
            }}
          />
          <Link href=''>
            <SideBar />
          </Link>
        </div>
      </div>
    </header>
  );
}
