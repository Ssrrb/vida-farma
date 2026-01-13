
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';

const Hero: React.FC = () => {
  const handleNavClick = (e: React.MouseEvent<HTMLElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 85;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      
      try {
        window.history.pushState(null, '', `#${targetId}`);
      } catch (err) {
        // Ignore SecurityError
      }
    }
  };

  return (
    <section className="relative w-full min-h-screen bg-[#4A6C7C] pt-28 pb-16 px-4 md:px-8 font-sans">
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]">
            
            {/* Large Orange Banner */}
            <div className="lg:col-span-2 bg-[#F97316] rounded-xl p-8 md:p-12 relative overflow-hidden text-white flex flex-col justify-center min-h-[400px]">
                <div className="relative z-10 max-w-lg">
                    <span className="block text-sm font-medium uppercase tracking-widest mb-2 border-b border-white/30 w-fit pb-1">Oferta de Verano</span>
                    <h2 className="text-5xl md:text-7xl font-serif mb-4 leading-none">20% OFF</h2>
                    <p className="text-lg md:text-xl font-light mb-8 opacity-90">
                        En productos de dermocosmética y bienestar seleccionados con el código <span className="font-bold border-b-2 border-white">VIDA20</span>
                    </p>
                    <a href="#products" onClick={(e) => handleNavClick(e, 'products')} className="inline-block bg-white text-[#F97316] px-8 py-3 rounded-full font-bold uppercase tracking-wide hover:bg-[#F5F2EB] transition-colors">
                        Comprar Ahora
                    </a>
                </div>
                {/* Background Typography Graphic */}
                <div className="absolute right-0 bottom-0 text-[12rem] md:text-[18rem] font-bold text-white/10 leading-none pointer-events-none select-none -mb-16 -mr-8 font-serif">
                    2025
                </div>
            </div>

            {/* Right Column Stacked Cards */}
            <div className="flex flex-col gap-6">
                
                {/* Promo Card 1: New Year */}
                <div className="bg-white rounded-xl p-8 flex-1 flex flex-col justify-center items-start relative overflow-hidden group hover:shadow-lg transition-all">
                    <h3 className="text-3xl font-serif text-[#2C2A26] mb-2 z-10">Año nuevo,<br/>ahorros nuevos.</h3>
                    <p className="text-[#5D5A53] mb-4 z-10">Desbloquea tus cupones exclusivos.</p>
                    <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-[#FFD700] rounded-full opacity-20 group-hover:scale-150 transition-transform duration-700"></div>
                    <div className="z-10 bg-[#EBE7DE] p-3 rounded-full text-[#2C2A26]">
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H4.5a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12" />
                        </svg>
                    </div>
                </div>

                {/* Promo Card 2: BOGO */}
                <div className="bg-white rounded-xl p-8 flex-1 flex flex-row items-center justify-between relative overflow-hidden group hover:shadow-lg transition-all">
                    <div className="z-10">
                        <span className="text-xs font-bold uppercase tracking-widest text-[#F97316] mb-1 block">Vitaminas</span>
                        <h3 className="text-4xl font-serif text-[#2C2A26] mb-1">2x1</h3>
                        <p className="text-lg font-bold text-[#2C2A26] mb-1">GRATIS</p>
                        <p className="text-sm text-[#5D5A53]">en marcas seleccionadas</p>
                    </div>
                    <div className="w-24 h-24 md:w-32 md:h-32 relative z-10">
                         <img 
                            src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=300" 
                            alt="Vitamins" 
                            className="w-full h-full object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-500"
                        />
                    </div>
                </div>

            </div>
        </div>

        {/* Bottom Row: Additional Offers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
             {/* Card 1 */}
             <div className="bg-white rounded-xl p-6 flex flex-col justify-between h-48 hover:shadow-md transition-shadow cursor-pointer">
                <div>
                    <span className="text-xs font-bold uppercase text-[#5D5A53] mb-2 block">Cuidado de la Piel</span>
                    <h4 className="text-3xl font-serif text-[#2C2A26]">50% OFF</h4>
                    <p className="text-sm text-[#5D5A53]">2da unidad misma marca</p>
                </div>
                <div className="self-end">
                    <span className="text-[#F97316] text-xl">✦</span>
                </div>
             </div>

             {/* Card 2 */}
             <div className="bg-white rounded-xl p-6 flex flex-col justify-between h-48 hover:shadow-md transition-shadow cursor-pointer">
                <div>
                    <span className="text-xs font-bold uppercase text-[#5D5A53] mb-2 block">Martes y Jueves</span>
                    <h4 className="text-3xl font-serif text-[#2C2A26]">15-25% OFF</h4>
                    <p className="text-sm text-[#5D5A53]">Medicamentos seleccionados</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full self-end opacity-50"></div>
             </div>

             {/* Card 3 */}
             <div className="bg-white rounded-xl p-6 flex flex-col justify-between h-48 hover:shadow-md transition-shadow cursor-pointer">
                <div>
                    <span className="text-xs font-bold uppercase text-[#5D5A53] mb-2 block">Reintegros</span>
                    <h4 className="text-3xl font-serif text-[#2C2A26]"><span className="text-lg align-top"></span> Hasta 40%</h4>
                    <p className="text-sm text-[#5D5A53]">En medicamentos seleccionados</p>
                </div>
                <div className="self-end text-[#2C2A26] opacity-20">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                    </svg>
                </div>
             </div>

             {/* Card 4 */}
             <div className="bg-white rounded-xl p-6 flex flex-col justify-between h-48 hover:shadow-md transition-shadow cursor-pointer">
                <div>
                    <span className="text-xs font-bold uppercase text-[#5D5A53] mb-2 block">Suplementos</span>
                    <h4 className="text-3xl font-serif text-[#2C2A26]">50% OFF</h4>
                    <p className="text-sm text-[#5D5A53]">En la segunda unidad</p>
                </div>
                <div className="self-end text-[#F97316]">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                    </svg>
                </div>
             </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
