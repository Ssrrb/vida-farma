'use client';

import React, { useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface StoreProps {
  products: Product[];
  categories: string[];
}

const Store: React.FC<StoreProps> = ({ products, categories }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const activeCategory = searchParams.get('category') || 'Todo';
  const searchQuery = searchParams.get('search') || '';

  const updateParams = (category: string, search: string) => {
    const params = new URLSearchParams();
    if (category && category !== 'Todo') params.set('category', category);
    if (search) params.set('search', search);
    router.push(`/store?${params.toString()}`);
  };

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesCategory = activeCategory === 'Todo' || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, products]);

  return (
    <div className="min-h-screen bg-background pt-32 pb-24 px-6 md:px-12 animate-fade-in-up">
      <div className="max-w-[1800px] mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-border pb-8 gap-8">
            <div>
                <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-4">Tienda</h1>
                <p className="text-muted-foreground">
                    {searchQuery 
                        ? `Resultados para "${searchQuery}"` 
                        : `Explorando ${activeCategory}`}
                </p>
            </div>
            
            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2 md:justify-end max-w-2xl">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => updateParams(cat, '')}
                        className={`px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all border ${
                            activeCategory === cat 
                                ? 'bg-primary text-primary-foreground border-primary' 
                                : 'bg-transparent text-muted-foreground border-border hover:border-primary hover:text-primary'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>

        {/* Grid */}
        {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
            {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center py-24 text-muted-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16 mb-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <p className="text-xl font-serif">No encontramos productos.</p>
                <p className="text-sm mt-2">Intenta con otra categoría o término de búsqueda.</p>
                <button 
                    onClick={() => updateParams('Todo', '')}
                    className="mt-6 text-primary underline underline-offset-4 font-medium"
                >
                    Ver todo el catálogo
                </button>
            </div>
        )}
      </div>
    </div>
  );
};

export default Store;
