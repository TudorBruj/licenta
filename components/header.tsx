'use client'

import Link from "next/link";
import { Big_Shoulders_Text } from 'next/font/google'
import { MdOutlineShoppingCart } from "react-icons/md";
import { Badge } from 'primereact/badge';
import { useAppSelector } from "@/lib/hooks";

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
        <div className=" flex gap-4 ">
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
        <Link href=" cart.html ">
          <i className="pi pi-shopping-cart text-main-color" style={{ fontSize: '2rem' }}>
            <Badge value={cartCount}></Badge>
          </i>
        </Link>
      </div>
    </header>
  );
}
