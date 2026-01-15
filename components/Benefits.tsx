import React from 'react';
import { Store, Truck, MessageCircle, CreditCard, HelpCircle } from 'lucide-react';

const Benefits = () => {
    const benefits = [
        {
            id: 1,
            icon: <Store className="w-10 h-10 mb-4 text-foreground stroke-[1.5]" />,
            title: 'RETIRO GRATIS',
            description: 'EN 3 SUCURSALES HABILITADAS',
        },
        {
            id: 2,
            icon: <Truck className="w-10 h-10 mb-4 text-foreground stroke-[1.5]" />,
            title: 'ENVÍOS A DOMICILIO',
            description: 'EN PEDRO JUAN CABALLERO',
        },
        {
            id: 3,
            icon: <MessageCircle className="w-10 h-10 mb-4 text-foreground stroke-[1.5]" />,
            title: 'FARMACIA POR WHATSAPP',
            description: '0984427741',
        },
        {
            id: 4,
            icon: <CreditCard className="w-10 h-10 mb-4 text-foreground stroke-[1.5]" />,
            title: 'MEDIOS DE PAGO',
            description: 'QR, TARJETAS Y TRANSFERENCIAS',
        },
        {
            id: 5,
            icon: <HelpCircle className="w-10 h-10 mb-4 text-foreground stroke-[1.5]" />,
            title: 'PREGUNTAS FRECUENTES',
            description: '¿DUDAS? POR AQUÍ',
        },
    ];

    return (
        <section className="w-full bg-background py-12 px-4 md:px-8 border-b border-border/40">
            <div className="max-w-[1600px] mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                    {benefits.map((benefit) => (
                        <div key={benefit.id} className="flex flex-col items-center text-center group cursor-default">
                            <div className="transform transition-transform duration-300 group-hover:scale-110">
                                {benefit.icon}
                            </div>
                            <h3 className="text-sm font-bold text-primary uppercase tracking-wide mb-2">
                                {benefit.title}
                            </h3>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider max-w-[180px]">
                                {benefit.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Benefits;
