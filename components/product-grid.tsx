"use client";

import React, { useState } from "react";
import { Button } from "primereact/button";
import { DataView } from "primereact/dataview";
import { Paginator } from "primereact/paginator";
import Image from "next/image";
import { Product } from "@/lib/data/products";
import { useAppDispatch } from "@/lib/hooks";

export default function ProductGrid({ products }: { products: Product[] }) {
  const dispatch = useAppDispatch();

  const [first, setFirst] = useState<number>(0);
  const [rows, setRows] = useState<number>(12);

  const onPageChange = (event: { first: number; rows: number }) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  const gridItem = (product: Product) => {
    return (
      <div className="p-2" key={product.id}>
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
                src={product.images}
                alt="Description of image"
                layout="fill"
                objectFit="contain"
                objectPosition="center"
              />
            </div>
            <div className="text-base font-bold whitespace-nowrap overflow-hidden text-ellipsis w-full text-center">
              {product.name}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-semibold text-gray-700 dark:text-white/80">
              ${product.price}
            </span>
            <Button
              icon="pi pi-shopping-cart"
              className="p-button-rounded"
              label="Add to Cart"
              onClick={() =>
                dispatch({
                  type: "cart/incrementQuantity",
                  payload: { id: product.id, quantity: 1 },
                })
              }
            ></Button>
          </div>
        </div>
      </div>
    );
  };

  const paginatedProducts = products.slice(first, first + rows);

  return (
    <div>
      <DataView
        value={paginatedProducts}
        itemTemplate={gridItem}
        layout={"grid"}
        pt={{
          grid: {
            className:
              "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
          },
        }}
      />
      <div className="card">
        <Paginator
          first={first}
          rows={rows}
          totalRecords={products.length}
          onPageChange={onPageChange}
          rowsPerPageOptions={[12, 24, 36]}
        />
      </div>
    </div>
  );
}
