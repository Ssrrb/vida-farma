import { NextResponse } from 'next/server';
import { fetchProducts } from '@/services/productService.js';

export async function GET() {
  try {
    const products = await fetchProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Failed to load products:', error);
    return NextResponse.json({ error: 'Failed to load products' }, { status: 500 });
  }
}
