import { NextResponse } from 'next/server';
import { fetchCategories } from '@/services/categoryService.js';

export async function GET() {
  try {
    const categories = await fetchCategories();
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Failed to load categories:', error);
    return NextResponse.json({ error: 'Failed to load categories' }, { status: 500 });
  }
}
