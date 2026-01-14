'use client';
import React from 'react';
import Link from 'next/link';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link href={`/product/${product.id}`} className="group flex flex-col gap-6 cursor-pointer">
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-muted">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-110"
        />
        
        {/* Hover overlay with "Quick View" - minimalistic */}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <span className="bg-card/90 backdrop-blur text-foreground px-6 py-3 rounded-full text-xs uppercase tracking-widest font-medium shadow-sm">
                    Ver Detalles
                </span>
            </div>
        </div>
      </div>
      
      <div className="text-center">
        <h3 className="text-2xl font-serif font-medium text-foreground mb-1 group-hover:text-primary transition-colors">{product.name}</h3>
        <p className="text-sm font-light text-muted-foreground mb-3 tracking-wide">{product.category}</p>
        <span className="text-sm font-medium text-foreground block">Gs. {product.price.toLocaleString('es-PY')}</span>
      </div>
    </Link>
  );
};

export default ProductCard;
