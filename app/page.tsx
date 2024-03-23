import ProductCarousel from "@/components/carousel";
import ProductGrid from "@/components/product-grid";
import { getProducts } from "@/lib/products";
import { Big_Shoulders_Text } from 'next/font/google'

const font= Big_Shoulders_Text({ subsets: ['latin'] })

export default async function Home() {
  const products = await getProducts();

  return (
    <main>
    <section>
        <div>
            <img src="images/home.png" alt=""/>
        </div>
    </section>
    <section>
        <ProductCarousel products={products}/>
        <h2 className={" font-black text-lg text-center " + font.className }>Discover Product</h2>
        <ProductGrid products={products}/>
    </section>
    </main>
  );
}
