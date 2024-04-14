"use client"

import React from "react";
import { Button } from "primereact/button";
import { DataView } from "primereact/dataview";
import Image from "next/image";
import "primeicons/primeicons.css";
import { Product } from "@/lib/data/products";
import { useAppDispatch } from "@/lib/hooks";

export type CartProduct = Product & {quantity: number}

export default function SidebarProductList({ products }: { products: CartProduct[] }) {
  const dispatch = useAppDispatch();

  const gridItem = (product: CartProduct) => {
    return (
      <div key={product.id} className="cart-item flex items-center space-x-4 mb-4">
        <div className="item-image">
          <Image src={product.images} alt={product.name} width={75} height={75} />
        </div>
        <div className="item-details flex flex-col">
          <div className="item-title text-sm">{product.name}</div>
          <div className="item-price">${product.price}</div>
          <div className="item-quantity flex items-center">
            <Button
              icon="pi pi-minus"
              className="my-1 mx-2"
              onClick={() => dispatch({ type: 'cart/decrementQuantity', payload: { id: product.id, quantity: 1 } })}
            />
            <span className="quantity-value">{product.quantity}</span>
            <Button
              icon="pi pi-plus"
              className="my-1 mx-2"
              onClick={() => dispatch({ type: 'cart/incrementQuantity', payload: { id: product.id, quantity: 1 } })}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <DataView value={products} itemTemplate={gridItem} layout={"list"} emptyMessage="Shopping Cart is empty!"/>
  );
}
