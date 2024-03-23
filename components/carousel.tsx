"use client"

import React from "react";
import { Button } from "primereact/button";
import { Carousel } from "primereact/carousel";
import Image from "next/image";
import { Product } from "@/lib/products";

export default function ProductCarousel({products}: {products: Product[]}) {

  const productTemplate = (product: Product) => {
    return (
      <div className="border bg-white dark:bg-gray-900 border-gray-300 dark:border-blue-900/40 rounded-lg m-2 text-center py-5 px-3">
        <div className="mb-3 flex justify-center">
        <div style={{ width: "150px", height: "150px", position: "relative" }}>
          <Image
            src={product.image}
            alt="Description of image"
            layout="fill"
            objectFit="contain"
            objectPosition="center"
          />
        </div>
        </div>
        <div>
          <h6 className="mt-0 mb-3 font-medium text-gray-700 dark:text-white/80">${product.price}</h6>
          <div className="mt-5 flex flex-wrap gap-2 justify-center align-center">
            <Button icon="pi pi-search" className="p-button p-button-rounded" />
            <Button
              icon="pi pi-star-fill"
              className="mr-2 text-gray-700 dark:text-white/80 inline-flex"
            />
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="card">
      <Carousel
        value={products}
        circular
        autoplayInterval={3000}
        itemTemplate={productTemplate}
      />
    </div>
  );
}
