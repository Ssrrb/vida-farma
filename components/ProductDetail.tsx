'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '../types';
import { useCart } from '@/context/CartContext';

interface ProductDetailProps {
  product: Product;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const router = useRouter();
  const { addToCart } = useCart();

  const handleWhatsAppClick = () => {
    // Replace with the actual pharmacy phone number in international format (e.g., 5959...)
    const phoneNumber = "595984427741";
    const message = encodeURIComponent(`Hola VidaFarma, estoy interesado/a en el producto: ${product.name}. ¿Me podrían dar más información?`);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="pt-24 min-h-screen bg-background animate-fade-in-up">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 pb-24">

        {/* Breadcrumb / Back */}
        <button
          onClick={() => router.back()}
          className="group flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-1 transition-transform">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Volver
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">

          {/* Left: Main Image Only */}
          <div className="flex flex-col gap-4">
            <div className="w-full aspect-[4/5] bg-muted overflow-hidden rounded-2xl shadow-lg">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover animate-fade-in-up"
              />
            </div>
          </div>

          {/* Right: Details */}
          <div className="flex flex-col justify-center max-w-xl">
            <span className="text-sm font-medium text-muted-foreground uppercase tracking-widest mb-2">{product.category}</span>
            <h1 className="text-4xl md:text-5xl font-serif text-foreground mb-4">{product.name}</h1>
            <span className="text-2xl font-light text-foreground mb-8">Gs. {product.price.toLocaleString('es-PY')}</span>

            <p className="text-muted-foreground leading-relaxed font-light text-lg mb-8 border-b border-border pb-8">
              {product.longDescription || product.description}
            </p>

            <div className="flex flex-col gap-4">
              {/* Add to Cart Button */}
              <button
                onClick={() => addToCart(product)}
                className="w-full py-5 bg-primary text-primary-foreground uppercase tracking-widest text-sm font-medium hover:opacity-90 transition-all shadow-lg hover:shadow-xl"
              >
                Agregar al Carrito
              </button>

              {/* WhatsApp Button */}
              <button
                onClick={handleWhatsAppClick}
                className="w-full py-5 border border-primary text-primary uppercase tracking-widest text-sm font-medium hover:bg-primary/5 transition-all flex items-center justify-center gap-3"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Consultar por WhatsApp
              </button>

              <ul className="mt-8 space-y-2 text-sm text-muted-foreground">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <span className="w-1 h-1 bg-primary rounded-full"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
