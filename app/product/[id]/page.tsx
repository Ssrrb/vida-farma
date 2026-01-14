import { notFound } from 'next/navigation';
import ProductDetail from '@/components/ProductDetail';
import { fetchProductById } from '@/services/productService.js';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = await fetchProductById(id);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}