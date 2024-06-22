import ProductCarousel from '@/components/carousel';
import ProductGrid from '@/components/product-grid';
import { getProducts } from '@/lib/data/products';
import { Big_Shoulders_Text } from 'next/font/google';

const font = Big_Shoulders_Text({ subsets: ['latin'] });

export default async function Home() {
  const products = await getProducts();

  return (
    <main>
      <section>
        <ProductCarousel />
        <h2 className={' text-center text-lg font-black ' + font.className}>
          Discover Products
        </h2>
        <ProductGrid products={products} />
      </section>
    </main>
  );
}
