"use client"

import React from "react";
import { Button } from "primereact/button";
import { DataView } from "primereact/dataview";
import Image from "next/image";
import "primeicons/primeicons.css";
import { Product } from "@/lib/products";
import { useAppDispatch } from "@/lib/hooks";

export type CartProduct = Product & {quantity: number}

export default function SidebarProductList({ products }: { products: CartProduct[] }) {
  const dispatch = useAppDispatch();

  const gridItem = (product: CartProduct) => {
    return (
      <div
        key={product.id}
      >
        <div className="bg-white dark:bg-gray-900 border-gray-300 dark:border-blue-900/40">
          <div className="flex flex-col items-center gap-3 py-5">
            <div
              style={{ width: "50px", height: "50px", position: "relative" }}
            >
              <Image
                src={product.image}
                alt="Description of image"
                layout="fill"
                objectFit="contain"
                objectPosition="center"
              />
            </div>
            <div className="text-xs font-bold overflow-hidden text-ellipsis text-center">{product.title}</div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700 dark:text-white/80">
              ${product.price} x {product.quantity}
            </span>
            <Button
              icon="pi pi-plus"
              className="p-button-rounded"
              onClick={() => dispatch({type: 'cart/incrementQuantity', payload: { id: product.id, quantity: 1 }})}
            ></Button>
            <Button
              icon="pi pi-minus"
              className="p-button-rounded"
              onClick={() => dispatch({type: 'cart/decrementQuantity', payload: { id: product.id, quantity: 1 }})}
            ></Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <DataView value={products} itemTemplate={gridItem} layout={"list"} emptyMessage="Shopping Cart is empty!"/>
  );
}
