import ProductGrid from "@/components/product-grid";
import { getProducts } from "@/lib/products";

export default async function Woman(){
    const products = await getProducts({
        filter: {
            category: "women's clothing"
        }
    });
    return (
        <ProductGrid products={products}/>
    );
}