import React from 'react';

interface LogoProps {
    className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '' }) => {
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            {/* Icon from SVG */}
            <img
                src="/logo-vidaFarma.svg"
                alt="Vida Farma Icon"
                className="h-10 md:h-12 w-auto object-contain"
            />

            {/* Brand Text */}
            <div className="flex flex-col justify-center leading-[0.8]">
                <span className="font-serif font-bold text-xl md:text-2xl text-[#2c8930] tracking-tight">
                    Vida
                </span>
                <span className="font-serif font-bold text-xl md:text-2xl text-[#054370] tracking-tight -mt-1 md:-mt-2">
                    Farma
                </span>
            </div>
        </div>
    );
};

export default Logo;
