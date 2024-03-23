export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    }
}

export async function getProducts(options: { filter?: Record<string, any> } = {}) {
    let url = "https://fakestoreapi.com/products";
    if (options.filter?.category)
        url = `https://fakestoreapi.com/products/category/${encodeURIComponent(options.filter.category)}`;
    console.log(url);
    const response = await fetch(url);
    const products: Product[] = await response.json();
    return products;
}