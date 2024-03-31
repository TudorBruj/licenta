'use client'

import Link from "next/link";
import { Big_Shoulders_Text } from 'next/font/google';
import { useAppSelector } from "@/lib/hooks";
import SideBar from "./sidebar";
import { Button } from "primereact/button";

const font= Big_Shoulders_Text({ subsets: ['latin'] })
const linkStyle = "text-main-color font-bold " + font.className

export default function Header() {
  const cartCount = useAppSelector((state) => state.cart.length);

  return (
    <header>
      <div className="flex items-center justify-between py-6 px-10 m-auto w-full">
        <Link href="/" className={"text-2xl text-main-color uppercase font-bold " + font.className}>
          Site
        </Link>
        <div className="flex gap-4 ">
          <Link href=" /category/woman" className={linkStyle}>
            Woman
          </Link>
          <Link href=" /category/man " className={linkStyle}>
            Man
          </Link>
          <Link href=" /category/accessories " className={linkStyle}>
            Accessories
          </Link>
        </div>
        <div className="flex">
        <Button icon="pi pi-user text-main-color text-2xl" style={{ fontSize: '2rem' }} />
        <Link href="">
          <SideBar/>
        </Link>
        </div>
      </div>
    </header>
  );
}
