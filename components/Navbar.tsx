
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState, useEffect, useRef } from 'react';
import { BRAND_NAME } from '../constants';

interface NavbarProps {
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
  onSearch: (query: string) => void;
  onCategorySelect: (category: string) => void;
  cartCount: number;
  onOpenCart: () => void;
}

const CATEGORIES = [
  'Medicamentos',
  'Perfumes',
  'Higiene',
  'Salud',
  'Dermocosmetica',
  'Bebé y Mamá',
  'Nutrición y Deporte'
];

const Navbar: React.FC<NavbarProps> = ({ onNavClick, onSearch, onCategorySelect, cartCount, onOpenCart }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const categoryTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
        onSearch(searchQuery);
        setMobileMenuOpen(false);
    }
  };

  const handleCategoryClick = (category: string) => {
    onCategorySelect(category);
    setShowCategories(false);
    setMobileMenuOpen(false);
  };

  // Determine styles based on state
  const isSolid = scrolled || mobileMenuOpen;
  const bgClass = isSolid ? 'bg-[#F5F2EB]/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6';
  const textClass = isSolid ? 'text-[#2C2A26]' : 'text-[#F5F2EB]';
  
  // Explicit text colors for input to ensure visibility against backgrounds
  const searchBgClass = isSolid 
    ? 'bg-white border-[#D6D1C7] text-[#2C2A26] placeholder-[#A8A29E]' 
    : 'bg-white/10 border-white/20 text-white placeholder-white/70';

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${bgClass}`}>
        <div className="max-w-[1800px] mx-auto px-4 md:px-8 flex items-center justify-between gap-8">
          
          {/* Logo */}
          <a 
            href="#" 
            onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                onNavClick(e, '');
            }}
            className={`text-2xl md:text-3xl font-serif font-medium tracking-tight z-50 whitespace-nowrap transition-colors duration-500 ${textClass}`}
          >
            {BRAND_NAME}
          </a>
          
          {/* Desktop Search & Nav */}
          <div className="hidden md:flex flex-1 items-center gap-6 justify-center max-w-4xl mx-auto">
             
             {/* Shop By Category Dropdown */}
             <div 
               className="relative group"
               onMouseEnter={() => {
                   if (categoryTimeoutRef.current) clearTimeout(categoryTimeoutRef.current);
                   setShowCategories(true);
               }}
               onMouseLeave={() => {
                   categoryTimeoutRef.current = setTimeout(() => setShowCategories(false), 200);
               }}
             >
                <button className={`flex items-center gap-2 text-sm font-medium uppercase tracking-wider py-2 transition-colors duration-500 ${textClass} hover:opacity-70`}>
                   Categorías
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                   </svg>
                </button>
                
                {/* Dropdown Menu */}
                <div 
                    className={`absolute top-full left-0 mt-4 w-64 bg-white rounded-xl shadow-xl border border-[#EBE7DE] overflow-hidden transition-all duration-300 origin-top-left ${
                        showCategories ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                    }`}
                >
                    <div className="py-2">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                onClick={() => handleCategoryClick(cat)}
                                className="block w-full text-left px-6 py-3 text-sm text-[#5D5A53] hover:bg-[#F5F2EB] hover:text-[#2C2A26] transition-colors"
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
             </div>

             {/* Search Bar */}
             <form onSubmit={handleSearchSubmit} className="flex-1 max-w-lg relative group transition-all duration-300">
                <input 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar medicamentos, productos..."
                    className={`w-full rounded-full border px-5 py-2.5 pl-11 text-sm outline-none focus:ring-2 focus:ring-[#2C2A26]/10 transition-all duration-300 ${searchBgClass}`}
                />
                <button type="submit" className={`absolute left-3.5 top-1/2 -translate-y-1/2 transition-colors duration-300 hover:scale-110 ${isSolid ? 'text-[#A8A29E] hover:text-[#2C2A26]' : 'text-white/70 hover:text-white'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </button>
             </form>
          </div>

          {/* Right Actions */}
          <div className={`flex items-center gap-6 z-50 relative transition-colors duration-500 ${textClass}`}>
            <button 
              onClick={onOpenCart}
              className="relative hover:opacity-60 transition-opacity"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#F97316] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                      {cartCount}
                  </span>
              )}
            </button>
            
            {/* Mobile Menu Toggle */}
            <button 
              className={`block md:hidden focus:outline-none transition-colors duration-500 ${textClass}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
               {mobileMenuOpen ? (
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                 </svg>
               ) : (
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                 </svg>
               )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-[#F5F2EB] z-40 flex flex-col pt-32 px-6 transition-all duration-500 ease-in-out overflow-y-auto ${
          mobileMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-10 pointer-events-none'
      }`}>
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="mb-8 relative">
                <input 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar productos..."
                    className="w-full bg-white border border-[#D6D1C7] rounded-full px-5 py-3 pl-12 text-[#2C2A26] outline-none shadow-sm"
                />
                <button type="submit" className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A8A29E]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </button>
          </form>

          <div className="flex flex-col space-y-6 text-xl font-serif font-medium text-[#2C2A26]">
            <div className="border-b border-[#D6D1C7] pb-4">
                <p className="text-sm font-sans font-bold uppercase tracking-widest text-[#A8A29E] mb-4">Categorías</p>
                <div className="flex flex-col gap-3 pl-2">
                    {CATEGORIES.map(cat => (
                         <button key={cat} onClick={() => handleCategoryClick(cat)} className="text-left hover:text-[#5D5A53] transition-colors">{cat}</button>
                    ))}
                </div>
            </div>
          </div>
      </div>
    </>
  );
};

export default Navbar;
