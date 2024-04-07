"use client"

import React, { useEffect, useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { Badge } from "primereact/badge";
import { useAppSelector } from "@/lib/hooks";
import { getProductById } from "@/lib/data/products";
import SidebarProductList, { CartProduct } from "./sidebar-product-list";

export default function SideBar() {
  const [visibleRight, setVisibleRight] = useState(false);
  const cart = useAppSelector((state) => state.cart);
  // const products =  cart.map(async item => await getProductById(item.id));
  const [products, setProducts] = useState<CartProduct[]>([]);

  
  useEffect (() => {
    const getProductsByCart = async (items: typeof cart) => {
      const products = [];
      for (const item of items) {
        const product: CartProduct = (await getProductById(item.id)) as any
        product.quantity = item.quantity
        products.push(product) 
      }
      console.log(products)
      return products;
    }
    getProductsByCart(cart).then((items) => setProducts(items))
  }, [cart]
  )


  return (
    <div className="card">
      <div className="flex gap-2 justify-content-center">
        <Button icon="pi pi-shopping-cart text-main-color text-2xl" style={{ fontSize: '2rem' }} onClick={() => setVisibleRight(true)} />
        <Badge value={cart.length}></Badge>
      </div>

      <Sidebar
        visible={visibleRight}
        position="right"
        onHide={() => setVisibleRight(false)}
      >
       <SidebarProductList products={products}/>
      </Sidebar>
    </div>
  );
}
