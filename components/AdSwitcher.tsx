'use client';

import React, { useState, useEffect } from 'react';
import { Discount } from './DiscountModal';

interface AdSwitcherProps {
    slides: Discount[];
    onOpenModal: (discount: Discount) => void;
}

const AdSwitcher: React.FC<AdSwitcherProps> = ({ slides, onOpenModal }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (slides.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 5000); // Rotate every 5 seconds

        return () => clearInterval(interval);
    }, [slides.length]);

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <div className="lg:col-span-2 relative h-full min-h-[450px] group overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out cursor-pointer ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                    onClick={() => onOpenModal(slide)}
                >
                    {/* Background Container */}
                    <div className="relative w-full h-full bg-muted flex flex-col justify-center overflow-hidden">

                        {/* Background Image - Clean, no overlays */}
                        <div className="absolute inset-0 z-0">
                            {slide.imageUrl && (
                                <img
                                    src={slide.imageUrl}
                                    alt={slide.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]"
                                />
                            )}
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation Dots */}
            {slides.length > 1 && (
                <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-3">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={(e) => {
                                e.stopPropagation();
                                goToSlide(index);
                            }}
                            className={`w-3 h-3 rounded-full transition-all duration-300 shadow-sm ${index === currentIndex
                                ? 'bg-white w-8'
                                : 'bg-white/60 hover:bg-white/80'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdSwitcher;
