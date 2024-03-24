"use client"

import React from "react";
import { Button } from "primereact/button";
import { DataView } from "primereact/dataview";
import Image from "next/image";
import "primeicons/primeicons.css";
import { Product } from "@/lib/products";
import { useAppDispatch } from "@/lib/hooks";

export default function ProductGrid({ products }: { products: Product[] }) {
  const dispatch = useAppDispatch();

  const gridItem = (product: Product) => {
    return (
      <div
        className="p-2"
        key={product.id}
      >
        <div className="p-4 border rounded-md bg-white dark:bg-gray-900 border-gray-300 dark:border-blue-900/40">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex align-items-center gap-2">
              <i className="pi pi-tag text-gray-700 dark:text-white/80"></i>
              <span className="font-semibold text-gray-700 dark:text-white/80">
                {product.category}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center gap-3 py-5">
            <div
              style={{ width: "150px", height: "150px", position: "relative" }}
            >
              <Image
                src={product.image}
                alt="Description of image"
                layout="fill"
                objectFit="contain"
                objectPosition="center"
              />
            </div>
            <div className="text-base font-bold whitespace-nowrap overflow-hidden text-ellipsis w-full text-center">{product.title}</div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-semibold text-gray-700 dark:text-white/80">
              ${product.price}
            </span>
            <Button
              icon="pi pi-shopping-cart"
              className="p-button-rounded"
              onClick={() => dispatch({type: 'cart/addToCart', payload: { id: product.id, quantity: 1 }})}
            ></Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <DataView value={products} itemTemplate={gridItem} layout={"grid"} pt={{
      grid: { className: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' }
    }} />
  );
}
