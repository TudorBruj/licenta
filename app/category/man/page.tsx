import ProductGrid from "@/components/product-grid";
import { getProducts } from "@/lib/products";

export default async function Man(){
    const products = await getProducts({
        filter: {
            category: "men's clothing"
        }
    });

    return (
        <ProductGrid products={products}/>
    );
}