import ProductGrid from "@/components/product-grid";
import { getProductsByCategory } from "@/lib/products";

export default async function Man(){
    const products = await getProductsByCategory( "men's clothing");

    return (
        <ProductGrid products={products}/>
    );
}