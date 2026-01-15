'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import DiscountModal, { Discount } from './DiscountModal';
import AdSwitcher from './AdSwitcher';

const DISCOUNTS: Discount[] = [
    {
        id: 'summer-sale',
        title: '20% de Ahorro',
        subtitle: 'Oferta de Verano',
        description: 'Aprovecha un 20% de descuento en toda nuestra línea de dermocosmética y productos de bienestar seleccionados. Cuida tu piel este verano con la mejor calidad.',
        code: 'VIDA20',
        category: 'Ventas de Verano',
        colorScheme: 'dark',
        ctaText: 'Comprar Colección',
        imageUrl: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=1200'
    },
    {
        id: 'new-year',
        title: 'Ahorros de Año Nuevo',
        subtitle: 'Año nuevo, ahorros nuevos.',
        description: 'Comienza el año priorizando tu salud. Desbloquea cupones exclusivos para suplementos y vitaminas que te ayudarán a cumplir tus metas de bienestar.',
        code: 'NEW2025',
        category: 'Especial',
        colorScheme: 'light',
        ctaText: 'Ver Cupones',
    },
    {
        id: 'vitamins-bogo',
        title: '2x1 Vitaminas',
        subtitle: 'GRATIS',
        description: 'En el mes de la energía, llévate dos unidades al precio de una en marcas seleccionadas de complejos vitamínicos y minerales.',
        category: 'Vitaminas',
        colorScheme: 'light',
        ctaText: 'Aprovechar 2x1',
        imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=300'
    },
    {
        id: 'skincare-50',
        title: '50% de Ahorro',
        subtitle: 'Cuidado de la Piel',
        description: '50% de descuento en la segunda unidad de la misma marca en productos de limpieza facial y serums.',
        category: 'Cuidado de la Piel',
        colorScheme: 'light',
        ctaText: 'Ver Productos'
    },
    {
        id: 'meds-days',
        title: '15-25% de Ahorro',
        subtitle: 'Martes y Jueves',
        description: 'Días especiales de ahorro en medicamentos de venta libre y recetas seleccionadas todos los martes y jueves.',
        category: 'Medicamentos',
        colorScheme: 'light',
        ctaText: 'Ver Calendario'
    },
    {
        id: 'reintegros',
        title: 'Reintegro 40%',
        subtitle: 'Hasta 40% de Ahorro',
        description: 'Obtén reintegros directos al comprar medicamentos para enfermedades crónicas a través de Ueno Bank.',
        category: 'Salud',
        colorScheme: 'light',
        ctaText: 'Ver Convenios'
    },
    {
        id: 'supplements-50',
        title: '50% de Ahorro',
        subtitle: 'Suplementos',
        description: '50% de descuento en la segunda unidad de suplementos deportivos y proteínas seleccionadas.',
        category: 'Suplementos',
        colorScheme: 'light',
        ctaText: 'Comprar Ahora'
    }
];

const HERO_SLIDES: Discount[] = [
    {
        ...DISCOUNTS[0],
        imageUrl: '/central-ad.png',
        category: 'Dermocosmetica' // Target category
    },
    {
        id: 'special-offer-2',
        title: 'Oferta Especial',
        subtitle: 'Oferta Especial',
        description: '',
        colorScheme: 'dark',
        ctaText: '',
        imageUrl: '/central-ad2.png',
        category: 'Perfumes' // Target category
    }
];

const Hero: React.FC = () => {
    const [selectedDiscount, setSelectedDiscount] = useState<Discount | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();

    const handleOpenModal = (discount: Discount) => {
        setSelectedDiscount(discount);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleAction = (discount: Discount) => {
        console.log('Action for:', discount.id);
        setIsModalOpen(false);
        // Navigate to store or relevant section
        router.push('/#products');
    };

    const handleAdClick = (discount: Discount) => {
        if (discount.category) {
            router.push(`/?category=${encodeURIComponent(discount.category)}#products`);
        } else {
            router.push('/#products');
        }
    };

    // const mainBanner = DISCOUNTS[0]; // Replaced by HERO_SLIDES
    const sideCards = DISCOUNTS.slice(1, 3);
    const bottomCards = DISCOUNTS.slice(3);

    return (
        <section className="relative w-full min-h-screen bg-background pt-28 pb-16 px-4 md:px-8 font-sans">
            <div className="max-w-[1600px] mx-auto space-y-6">
                {/* Main Hero Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 auto-rows-[minmax(400px,auto)]">

                    {/* Large Main Banner with Ad Switcher */}
                    <AdSwitcher
                        slides={HERO_SLIDES}
                        onOpenModal={handleAdClick}
                    />

                    {/* Right Column Stacked Cards */}
                    <div className="flex flex-col gap-6">
                        {sideCards.map((discount) => (
                            <div
                                key={discount.id}
                                className="bg-card rounded-2xl p-8 flex-1 flex flex-col justify-center items-start relative overflow-hidden group hover:shadow-xl transition-all duration-500 cursor-pointer border border-border"
                                onClick={() => handleOpenModal(discount)}
                            >
                                <div className="relative z-10 w-full flex justify-between items-start">
                                    <div className="max-w-[60%]">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 block">{discount.category}</span>
                                        <h3 className="text-3xl font-serif text-foreground mb-2 leading-tight">{discount.subtitle}</h3>
                                        {discount.title !== discount.subtitle && (
                                            <p className="text-4xl font-serif text-foreground opacity-40">{discount.title}</p>
                                        )}
                                    </div>

                                    {discount.imageUrl && (
                                        <div className="w-24 h-24 relative rounded-full overflow-hidden bg-muted border border-border">
                                            <img
                                                src={discount.imageUrl}
                                                alt={discount.category}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                        </div>
                                    )}
                                </div>

                                <div className="mt-6 z-10 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-foreground group-hover:gap-4 transition-all">
                                    <span>{discount.ctaText}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                    </svg>
                                </div>

                                {/* Background detail */}
                                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-secondary rounded-full opacity-20 group-hover:scale-150 transition-transform duration-1000"></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Row: Additional Offers */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {bottomCards.map((discount) => (
                        <div
                            key={discount.id}
                            className="bg-card rounded-2xl p-8 flex flex-col justify-between min-h-[220px] hover:shadow-xl transition-all duration-500 cursor-pointer border border-border group"
                            onClick={() => handleOpenModal(discount)}
                        >
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3 block">{discount.category}</span>
                                <h4 className="text-3xl font-serif text-foreground leading-tight mb-2">{discount.title}</h4>
                                <p className="text-sm text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">{discount.subtitle}</p>
                            </div>
                            <div className="flex justify-between items-center mt-4">
                                <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors duration-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Detalles</span>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            <DiscountModal
                discount={selectedDiscount}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onAction={handleAction}
            />
        </section>
    );
};

export default Hero;
