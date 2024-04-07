import ProductGrid from "@/components/product-grid";
import {getProductsByCategory } from "@/lib/data/products";

export default async function Accessories(){
    const products = await getProductsByCategory( "Accessories");

    return (
        <ProductGrid products={products}/>
    );
}