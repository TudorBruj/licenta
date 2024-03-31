import ProductGrid from "@/components/product-grid";
import { getProductsByCategory } from "@/lib/products";

export default async function Woman(){
    const products = await getProductsByCategory( "women's clothing");
    return (
        <ProductGrid products={products}/>
    );
}