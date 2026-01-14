/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';

const Features: React.FC = () => {
  return (
    <section className="bg-muted">
      {/* Feature Block 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
        <div className="order-2 lg:order-1 relative h-[500px] lg:h-auto overflow-hidden">
           <img 
             src="https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=1200" 
             alt="Natural Stone Texture" 
             className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-[1.5s]"
           />
        </div>
        <div className="order-1 lg:order-2 flex flex-col justify-center p-12 lg:p-24 bg-muted">
           <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-6">Nuestra Filosofía</span>
           <h3 className="text-4xl md:text-5xl font-serif mb-8 text-foreground leading-tight">
             Calidad que <br/> perdura.
           </h3>
           <p className="text-lg text-muted-foreground font-light leading-relaxed mb-12 max-w-md">
             Rechazamos lo desechable. En VidaFarma, cada producto es seleccionado por su eficacia y calidad, asegurando que cuides tu salud con lo mejor disponible.
           </p>
           <a href="#" className="inline-block text-sm font-medium uppercase tracking-widest underline underline-offset-8 hover:text-primary transition-colors">Conoce más sobre nosotros</a>
        </div>
      </div>

      {/* Feature Block 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
        <div className="flex flex-col justify-center p-12 lg:p-24 bg-primary text-primary-foreground">
           <span className="text-xs font-bold uppercase tracking-[0.2em] opacity-80 mb-6 text-white">Atención Personalizada</span>
           <h3 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">
             Tu bienestar es <br/> nuestra prioridad.
           </h3>
           <p className="text-lg font-light leading-relaxed mb-12 max-w-md opacity-90 text-white/90">
             Nuestros expertos están siempre disponibles para asesorarte. No solo vendemos productos, brindamos soluciones de salud y belleza que se adaptan a tu estilo de vida.
           </p>
        </div>
        <div className="relative h-[500px] lg:h-auto overflow-hidden">
           <img 
             src="https://images.pexels.com/photos/6801917/pexels-photo-6801917.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
             alt="Woman sitting on wooden floor reading" 
             className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-[1.5s]"
           />
        </div>
      </div>
    </section>
  );
};

export default Features;