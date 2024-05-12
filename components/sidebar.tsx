"use client"

import React, { useEffect, useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Badge } from "primereact/badge";
import { useAppSelector } from "@/lib/hooks";
import { getProductById } from "@/lib/data/products";
import SidebarProductList, { CartProduct } from "./sidebar-product-list";
import { Paginator } from "primereact/paginator";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";

const asyncStripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function SideBar() {
  const [visibleRight, setVisibleRight] = useState(false);
  const cart = useAppSelector((state) => state.cart);
  const [products, setProducts] = useState<CartProduct[]>([]);
  const [quantity, setQuantity] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const router = useRouter();

  const [first, setFirst] = useState<number>(0);
  const [rows, setRows] = useState<number>(5);

  const onPageChange = (event: { first: number; rows: number }) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  useEffect (() => {
    const getProductsByCart = async (items: typeof cart) => {
      const products = [];
      for (const item of items) {
        const product: CartProduct = (await getProductById(item.id)) as any
        console.log(product, item.id)
        product.quantity = item.quantity
        products.push(product) 
      }
      console.log(products)
      return products;
    }
    getProductsByCart(cart).then((items) => setProducts(items))
  }, [cart]);

  useEffect (() => {
    let count = 0;
    let amount = 0;
    for (const item of cart) {
      count += item.quantity;
      const product = products.find(p => p.id === item.id);
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
      const res = await fetch("/api/stripe/session", {
        method: "POST",
        body: JSON.stringify({
          products
        }),
        headers: { "Content-Type": "application/json" },
      });
      const { sessionId } = await res.json();

      const { error } = await stripe.redirectToCheckout({ sessionId });
      console.log(error);
      if (error) {
        router.push("/error");
      }
    } catch (err) {
      console.log(err);
      router.push("/error");
    }
  };

  return (
    <div className="card">
      <div className="flex gap-2 justify-content-center">
        <Button
          icon="pi pi-shopping-cart text-main-color text-2xl"
          style={{ fontSize: "2rem" }}
          onClick={() => setVisibleRight(true)}
        />
        <Badge value={quantity}></Badge>
      </div>

      <Sidebar
        visible={visibleRight}
        position="right"
        onHide={() => setVisibleRight(false)}
      >
        <SidebarProductList products={paginatedProducts} />
        <div className="card">
          <Paginator
            first={first}
            rows={rows}
            totalRecords={products.length}
            onPageChange={onPageChange}
            className="flex justify-center p-4"
          />
        </div>
        <div className="absolute inset-x-0 bottom-12 flex justify-between p-4">
          <div>Total Amount: ${totalAmount.toFixed(2)}</div>
          <Button label="Checkout" onClick={handler} />
        </div>
      </Sidebar>
    </div>
  );
}
