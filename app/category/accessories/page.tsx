import ProductGrid from "@/components/product-grid";
import { getProducts } from "@/lib/products";

export default async function Accessories(){
    const promiseJ = getProducts({
        filter: {
            category: "jewelery"
        }
    });

    const promiseE = getProducts({
        filter: {
            category: "electronics"
        }
    });

    const [productsJ, productsE] = await Promise.all([promiseJ, promiseE]);
    
    const products = [...productsJ, ...productsE];

    return (
        <ProductGrid products={products}/>
    );
}