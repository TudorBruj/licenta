'use client';

import Link from 'next/link';
import { Big_Shoulders_Text } from 'next/font/google';
import SideBar from './sidebar';
import { Button } from 'primereact/button';
import { signOut } from '@/lib/auth';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

const font = Big_Shoulders_Text({ subsets: ['latin'] });
const linkStyle = 'text-main-color font-bold ' + font.className;

export default function Header() {
  const { data } = useSession();

  return (
    <header>
      <div className='sticky m-auto flex w-full items-center justify-between px-10 py-6'>
        <Link href='/' className='flex items-center'>
          <Image src='/images/Hanger.png' alt='Logo' width={120} height={40} />
        </Link>
        <div className='absolute left-[50%] flex flex-1 translate-x-[-50%] justify-evenly gap-8'>
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
        <div className='flex items-center'>
          <a href='/admin'>
            <Button
              icon='pi pi-user text-main-color text-2xl'
              style={{ fontSize: '2rem' }}
            />
          </a>
          {data?.user && (
            <Button
              icon='pi pi-sign-out text-main-color text-2xl'
              style={{ fontSize: '2rem' }}
              onClick={async () => {
                await signOut();
              }}
            />
          )}
          <SideBar />
        </div>
      </div>
    </header>
  );
}
