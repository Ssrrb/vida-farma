
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useMemo } from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface StoreProps {
  initialCategory?: string;
  initialSearch?: string;
  onProductClick: (product: Product) => void;
  products: Product[];
  categories: string[];
}

const Store: React.FC<StoreProps> = ({ initialCategory, initialSearch, onProductClick, products, categories }) => {
  const [activeCategory, setActiveCategory] = useState(initialCategory || 'Todo');
  const [searchQuery, setSearchQuery] = useState(initialSearch || '');

  // Update state if props change (navigating from navbar)
  useEffect(() => {
    if (initialCategory) setActiveCategory(initialCategory);
  }, [initialCategory]);

  useEffect(() => {
    if (initialSearch !== undefined) setSearchQuery(initialSearch);
  }, [initialSearch]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesCategory = activeCategory === 'Todo' || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, products]);

  return (
    <div className="min-h-screen bg-[#F5F2EB] pt-32 pb-24 px-6 md:px-12 animate-fade-in-up">
      <div className="max-w-[1800px] mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-[#D6D1C7] pb-8 gap-8">
            <div>
                <h1 className="text-4xl md:text-5xl font-serif text-[#2C2A26] mb-4">Tienda</h1>
                <p className="text-[#5D5A53]">
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
                        onClick={() => {
                            setActiveCategory(cat);
                            setSearchQuery(''); // Clear search when picking a category manually
                        }}
                        className={`px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all border ${
                            activeCategory === cat 
                                ? 'bg-[#2C2A26] text-white border-[#2C2A26]' 
                                : 'bg-transparent text-[#5D5A53] border-[#D6D1C7] hover:border-[#2C2A26]'
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
                <ProductCard key={product.id} product={product} onClick={onProductClick} />
            ))}
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center py-24 text-[#A8A29E]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16 mb-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <p className="text-xl font-serif">No encontramos productos.</p>
                <p className="text-sm mt-2">Intenta con otra categoría o término de búsqueda.</p>
                <button 
                    onClick={() => { setActiveCategory('Todo'); setSearchQuery(''); }}
                    className="mt-6 text-[#2C2A26] underline underline-offset-4"
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
