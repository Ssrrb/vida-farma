
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';
import { Product } from '../types';

interface CheckoutProps {
  items: Product[];
  onBack: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ items, onBack }) => {
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const shipping = 0; // Envío gratis
  const total = subtotal + shipping;

  const handleWhatsAppCheckout = () => {
    // Group items by ID to show quantities
    const groupedItems = items.reduce((acc: { [key: string]: { product: Product; quantity: number } }, item) => {
      if (acc[item.id]) {
        acc[item.id].quantity += 1;
      } else {
        acc[item.id] = { product: item, quantity: 1 };
      }
      return acc;
    }, {});

    const itemsList = Object.values(groupedItems)
      .map(({ product, quantity }) => `- ${quantity}x ${product.name} (Gs. ${(product.price * quantity).toLocaleString('es-PY')})`)
      .join('\n');

    const message = `Hola estoy interesado en comprar los siguientes productos:\n\n${itemsList}\n\n*Total: Gs. ${total.toLocaleString('es-PY')}*`;
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = '595981123456';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen pt-24 pb-24 px-6 bg-[#F5F2EB] animate-fade-in-up">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={onBack}
          className="group flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[#A8A29E] hover:text-[#2C2A26] transition-colors mb-12"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-1 transition-transform">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Volver a la Tienda
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left Column: Flow */}
          <div>
            <h1 className="text-3xl font-serif text-[#2C2A26] mb-4">Finalizar Compra</h1>
            <p className="text-sm text-[#5D5A53] mb-12">Completa tu pedido a través de WhatsApp. Te contactaremos para coordinar la entrega y el pago.</p>

            <div className="space-y-12">
              <div>
                <h2 className="text-xl font-serif text-[#2C2A26] mb-6">Información del Pedido</h2>
                <div className="p-8 border border-[#D6D1C7] bg-white/50 space-y-6">
                  <p className="text-[#5D5A53] leading-relaxed">
                    Al confirmar tu pedido, serás redirigido a WhatsApp con el resumen de tu compra.
                    Nuestro equipo recibirá tu mensaje y se pondrá en contacto contigo para finalizar los detalles de envío y métodos de pago.
                  </p>
                  <div className="flex items-start gap-4 text-sm text-[#5D5A53]">
                    <span className="text-xl">🚚</span>
                    <p>Envío a domicilio en Pedro Juan Caballero y alrededores.</p>
                  </div>
                  <div className="flex items-start gap-4 text-sm text-[#5D5A53]">
                    <span className="text-xl">💳</span>
                    <p>Aceptamos transferencias, tarjetas y efectivo al momento de la entrega.</p>
                  </div>
                </div>
              </div>

              <div>
                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-5 bg-[#2C2A26] text-[#F5F2EB] uppercase tracking-widest text-sm font-medium hover:bg-[#433E38] transition-colors shadow-lg flex items-center justify-center gap-3"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.412.004 12.049a11.82 11.82 0 001.574 5.93L0 24l6.102-1.6a11.816 11.816 0 005.943 1.598c6.632 0 12.042-5.412 12.042-12.049a11.816 11.816 0 00-3.643-8.527z" />
                  </svg>
                  Finalizar Pedido — Gs. {total.toLocaleString('es-PY')}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Summary */}
          <div className="lg:pl-12 lg:border-l border-[#D6D1C7]">
            <h2 className="text-xl font-serif text-[#2C2A26] mb-8">Resumen del Pedido</h2>

            <div className="space-y-6 mb-8">
              {items.map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-16 h-16 bg-[#EBE7DE] relative">
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#2C2A26] text-white text-[10px] flex items-center justify-center rounded-full">1</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-[#2C2A26] text-base">{item.name}</h3>
                    <p className="text-xs text-[#A8A29E]">{item.category}</p>
                  </div>
                  <span className="text-sm text-[#5D5A53]">Gs. {item.price.toLocaleString('es-PY')}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-[#D6D1C7] pt-6 space-y-2">
              <div className="flex justify-between text-sm text-[#5D5A53]">
                <span>Subtotal</span>
                <span>Gs. {subtotal.toLocaleString('es-PY')}</span>
              </div>
              <div className="flex justify-between text-sm text-[#5D5A53]">
                <span>Envío</span>
                <span>Gratis</span>
              </div>
            </div>

            <div className="border-t border-[#D6D1C7] mt-6 pt-6">
              <div className="flex justify-between items-center">
                <span className="font-serif text-xl text-[#2C2A26]">Total</span>
                <div className="flex items-end gap-2">
                  <span className="text-xs text-[#A8A29E] mb-1">PYG</span>
                  <span className="font-serif text-2xl text-[#2C2A26]">Gs. {total.toLocaleString('es-PY')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
