import ProductGrid from '@/components/product-grid';
import { getProductsByCategory } from '@/lib/data/products';

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const category = decodeURIComponent(params.category);
  const products = await getProductsByCategory(category);

  return <ProductGrid products={products} />;
}
