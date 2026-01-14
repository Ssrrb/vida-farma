'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

const CartDrawer: React.FC = () => {
  const { isCartOpen, setIsCartOpen, cartItems, removeFromCart } = useCart();
  const router = useRouter();
  
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = () => {
      setIsCartOpen(false);
      router.push('/checkout');
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-500 ${
          isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-[#F5F2EB] z-[70] shadow-2xl transform transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) flex flex-col ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-[#D6D1C7]">
          <h2 className="text-xl font-serif text-[#2C2A26]">Carrito de Compras</h2>
          <button onClick={() => setIsCartOpen(false)} className="text-[#A8A29E] hover:text-[#2C2A26] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col justify-center items-center text-[#A8A29E]">
              <span className="mb-4 text-4xl">🧴</span>
              <p>Tu carrito está vacío.</p>
            </div>
          ) : (
            cartItems.map((item, idx) => (
              <div key={idx} className="flex gap-4 animate-fade-in-up">
                <div className="w-20 h-20 bg-[#EBE7DE] overflow-hidden">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                   <div>
                     <h3 className="font-serif text-[#2C2A26] line-clamp-1">{item.name}</h3>
                     <p className="text-xs text-[#A8A29E] uppercase tracking-wide">{item.category}</p>
                   </div>
                   <div className="flex justify-between items-end">
                     <span className="text-sm text-[#5D5A53]">Gs. {item.price.toLocaleString('es-PY')}</span>
                     <button 
                       onClick={() => removeFromCart(idx)}
                       className="text-xs uppercase tracking-widest text-[#A8A29E] hover:text-red-800 transition-colors"
                     >
                       Eliminar
                     </button>
                   </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#D6D1C7] bg-[#EBE7DE]">
          <div className="flex justify-between items-center mb-6">
            <span className="text-sm uppercase tracking-widest text-[#5D5A53]">Subtotal</span>
            <span className="text-xl font-serif text-[#2C2A26]">Gs. {total.toLocaleString('es-PY')}</span>
          </div>
          <button 
            onClick={handleCheckout}
            disabled={cartItems.length === 0}
            className="w-full py-4 bg-[#2C2A26] text-[#F5F2EB] uppercase tracking-widest text-sm font-medium hover:bg-[#433E38] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Finalizar Compra
          </button>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;