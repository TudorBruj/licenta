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

export async function getProducts() {
    const url = "https://fakestoreapi.com/products";
    const response = await fetch(url);
    const products: Product[] = await response.json();
    return products;
}

export async function getProductsByCategory(category: string) {
    const url = "https://fakestoreapi.com/products/category/"+ encodeURIComponent(category);
    const response = await fetch(url);
    const products: Product[] = await response.json();
    return products;
}

export async function getProductById(id: number) {
    const url = "https://fakestoreapi.com/products/"+ encodeURIComponent(id);
    const response = await fetch(url);
    const product: Product = await response.json();
    return product;
}