'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';
import { useSearchParams } from 'next/navigation';

interface ProductGridProps {
  products: Product[];
  categories: string[];
}

const ProductGridContent: React.FC<ProductGridProps> = ({ products, categories }) => {
  const [activeCategory, setActiveCategory] = useState('Todo');
  const searchParams = useSearchParams();

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && categories.includes(categoryParam)) {
      setActiveCategory(categoryParam);
    }
  }, [searchParams, categories]);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'Todo') return products;
    return products.filter(p => p.category === activeCategory);
  }, [activeCategory, products]);

  return (
    <section id="products" className="py-32 px-6 md:px-12 bg-background">
      <div className="max-w-[1800px] mx-auto">

        {/* Header Area */}
        <div className="flex flex-col items-center text-center mb-24 space-y-8">
          <h2 className="text-4xl md:text-6xl font-serif text-foreground">Catálogo</h2>

          {/* Minimal Filter */}
          <div className="flex flex-wrap justify-center gap-8 pt-4 border-t border-border/50 w-full max-w-2xl">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-sm uppercase tracking-widest pb-1 border-b transition-all duration-300 ${activeCategory === cat
                  ? 'border-primary text-primary font-bold'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Large Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProductGrid: React.FC<ProductGridProps> = (props) => (
  <Suspense fallback={<div className="py-32 text-center text-muted-foreground animate-pulse">Cargando catálogo...</div>}>
    <ProductGridContent {...props} />
  </Suspense>
);

export default ProductGrid;
