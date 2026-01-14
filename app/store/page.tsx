import { Suspense } from 'react';
import Store from '@/components/Store';
import { fetchProducts } from '@/services/productService.js';
import { fetchCategories } from '@/services/categoryService.js';
import { Product, CategoryGroup } from '@/types';

export default async function StorePage() {
  const [productsData, categoriesData] = await Promise.all([
    fetchProducts(),
    fetchCategories(),
  ]);

  const products = productsData as Product[];
  const categories = categoriesData as CategoryGroup[];
  const categoryNames = ['Todo', ...categories.map((c) => c.name)];

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Store products={products} categories={categoryNames} />
    </Suspense>
  );
}