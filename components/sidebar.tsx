'use client';

import React, { useEffect, useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import { Badge } from 'primereact/badge';
import { useAppSelector } from '@/lib/hooks';
import { getProductById } from '@/lib/data/products';
import SidebarProductList, { CartProduct } from './sidebar-product-list';
import { Paginator } from 'primereact/paginator';
import { loadStripe } from '@stripe/stripe-js';
import Link from 'next/link';

const asyncStripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function SideBar() {
  const [visibleRight, setVisibleRight] = useState(false);
  const cart = useAppSelector((state) => state.cart);
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [quantity, setQuantity] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const [first, setFirst] = useState<number>(0);
  const [rows, setRows] = useState<number>(4);

  const onPageChange = (event: { first: number; rows: number }) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  useEffect(() => {
    const getProductsByCart = async (items: typeof cart) => {
      const products = [];
      for (const item of items) {
        const product: CartProduct = (await getProductById(item.id)) as any;
        product.quantity = item.quantity;
        products.push(product);
      }
      return products;
    };
    getProductsByCart(cart).then((items) => setProducts(items));
  }, [cart]);

  useEffect(() => {
    let count = 0;
    let amount = 0;
    for (const item of cart) {
      count += item.quantity;
      const product = products.find((p) => p.id === item.id);
      if (product) {
        amount += product.price * item.quantity;
      }
    }
    setQuantity(count);
    setTotalAmount(amount);
  }, [cart, products]);

  const paginatedProducts = products.slice(first, first + rows);

  const handler = async () => {
    try {
      const stripe = await asyncStripe;
      if (!stripe) return;
      const res = await fetch('/api/stripe/session', {
        method: 'POST',
        body: JSON.stringify({
          products,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
      const { sessionId } = await res.json();

      const { error } = await stripe.redirectToCheckout({ sessionId });
      console.error(error);
      if (error) {
        return (
          <Link href='/error'>
            <a>Error</a>
          </Link>
        );
      }
    } catch (err) {
      console.error(err);
      return (
        <Link href='/error'>
          <a>Error</a>
        </Link>
      );
    }
  };

  return (
    <div className='card'>
      <div className='justify-content-center flex gap-2'>
        <i
          className='pi pi-shopping-cart cursor-pointer pt-2 text-2xl text-main-color'
          onClick={() => setVisibleRight(true)}
        >
          <Badge value={quantity}></Badge>
        </i>
      </div>

      <Sidebar
        visible={visibleRight}
        position='right'
        onHide={() => setVisibleRight(false)}
      >
        <SidebarProductList products={paginatedProducts} />
        <div className='card'>
          <Paginator
            first={first}
            rows={rows}
            totalRecords={products.length}
            onPageChange={onPageChange}
            pt={{
              firstPageButton: {
                className: 'min-w-8',
              },
              prevPageButton: {
                className: 'min-w-8',
              },
              pageButton: {
                className: 'min-w-8',
              },
              nextPageButton: {
                className: 'min-w-8',
              },
              lastPageButton: {
                className: 'min-w-8',
              },
            }}
          />
        </div>
        <div className='inset-x-0 bottom-12 flex justify-between p-2'>
          <div>Total Amount: ${totalAmount.toFixed(2)}</div>
          <Button label='Checkout' onClick={handler} />
        </div>
      </Sidebar>
    </div>
  );
}
