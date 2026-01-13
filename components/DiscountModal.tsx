
import React, { useEffect } from 'react';

export interface Discount {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    code?: string;
    imageUrl?: string;
    category?: string;
    colorScheme: 'dark' | 'light' | 'accent';
    ctaText: string;
}

interface DiscountModalProps {
    discount: Discount | null;
    isOpen: boolean;
    onClose: () => void;
    onAction: (discount: Discount) => void;
}

const DiscountModal: React.FC<DiscountModalProps> = ({ discount, isOpen, onClose, onAction }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!discount) return null;

    return (
        <div
            className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-500 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-[#2C2A26]/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div
                className={`relative w-full max-w-2xl bg-[#F5F2EB] rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 transform ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'
                    }`}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 text-[#2C2A26] hover:bg-[#EBE7DE] rounded-full transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="flex flex-col md:flex-row h-full">
                    {/* Image/Visual Area */}
                    <div className="md:w-5/12 bg-[#EBE7DE] relative overflow-hidden min-h-[250px] flex items-center justify-center">
                        {discount.imageUrl ? (
                            <img
                                src={discount.imageUrl}
                                alt={discount.title}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        ) : (
                            <div className="text-[#2C2A26]/10 text-9xl font-serif select-none">
                                %
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#2C2A26]/20 to-transparent" />
                    </div>

                    {/* Content Area */}
                    <div className="md:w-7/12 p-8 md:p-12 flex flex-col justify-center">
                        <span className="text-xs font-bold uppercase tracking-widest text-[#A8A29E] mb-2">
                            {discount.category || 'Oferta Exclusiva'}
                        </span>
                        <h3 className="text-4xl font-serif text-[#2C2A26] mb-4 leading-tight">
                            {discount.title}
                        </h3>
                        <p className="text-[#5D5A53] mb-8 leading-relaxed">
                            {discount.description}
                        </p>

                        {discount.code && (
                            <div className="mb-8 p-4 bg-[#EBE7DE] rounded-lg border-2 border-dashed border-[#D6D1C7] flex flex-col items-center">
                                <span className="text-[10px] uppercase tracking-tighter text-[#A8A29E] mb-1">Código de Descuento</span>
                                <span className="text-2xl font-mono font-bold text-[#2C2A26] tracking-widest uppercase">
                                    {discount.code}
                                </span>
                            </div>
                        )}

                        <button
                            onClick={() => onAction(discount)}
                            className="w-full bg-[#2C2A26] text-[#F5F2EB] py-4 rounded-full font-bold uppercase tracking-widest hover:bg-[#5D5A53] transition-all transform hover:-translate-y-1 active:scale-95 shadow-lg"
                        >
                            {discount.ctaText}
                        </button>
                        <p className="text-center mt-4 text-[10px] text-[#A8A29E] uppercase tracking-widest">
                            * Aplican términos y condiciones
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiscountModal;
