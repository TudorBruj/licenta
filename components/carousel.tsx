"use client"

import React from "react";
import { Carousel } from "primereact/carousel";
import Image from "next/image";
import { Product } from "@/lib/data/products";

export default function ProductCarousel({products}: {products: Product[]}) {

  const productTemplate = (product: Product) => {
    return (
      <div className="border bg-white dark:bg-gray-900 border-gray-300 dark:border-blue-900/40 rounded-lg m-2 text-center py-5 px-3">
        <div className="mb-3 flex justify-center">
        <div style={{ width: "150px", height: "150px", position: "relative" }}>
          <Image
            src={product.images}
            alt="Description of image"
            layout="fill"
            objectFit="contain"
            objectPosition="center"
          />
        </div>
        </div>
        <div>
          <div className="mt-5 flex flex-wrap gap-2 justify-center align-center">{product.name}</div>
          <h6 className="mt-0 mb-3 font-medium text-gray-700 dark:text-white/80">${product.price}</h6>
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
