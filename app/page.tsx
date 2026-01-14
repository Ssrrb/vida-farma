import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import About from '@/components/About';
import Journal from '@/components/Journal';
import { fetchProducts } from '@/services/productService.js';
import { fetchCategories } from '@/services/categoryService.js';
import { Product, CategoryGroup } from '@/types';

export default async function Home() {
  const [productsData, categoriesData] = await Promise.all([
    fetchProducts(),
    fetchCategories(),
  ]);

  const products = productsData as Product[];
  const categories = categoriesData as CategoryGroup[];
  const categoryNames = ['Todo', ...categories.map((c) => c.name)];

  return (
    <>
      <Hero />
      <ProductGrid products={products} categories={categoryNames} />
      <About />
      <Journal />
    </>
  );
}