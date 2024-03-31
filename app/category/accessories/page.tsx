import ProductGrid from "@/components/product-grid";
import {getProductsByCategory } from "@/lib/products";

export default async function Accessories(){
    const promiseJ = getProductsByCategory("jewelery");

    const promiseE = getProductsByCategory("electronics")

    const [productsJ, productsE] = await Promise.all([promiseJ, promiseE]);
    
    const products = [...productsJ, ...productsE];

    return (
        <ProductGrid products={products}/>
    );
}