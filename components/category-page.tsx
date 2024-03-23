import ProductGrid from "@/components/product-grid";
import { getProducts } from "@/lib/products";

export default async function CategoryPage({ categories}: {categories: string[]}){ 
    const promises = categories.map(category => getProducts({filter:{category}}));

    const results = await Promise.all(promises);
    const products = [];
    for (const result of results) {
        products.push(...result);
    }

    return (
        <ProductGrid products={products}/>
    );
}