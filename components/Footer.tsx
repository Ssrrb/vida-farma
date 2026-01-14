'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    if (!email) return;
    setSubscribeStatus('loading');
    setTimeout(() => {
      setSubscribeStatus('success');
      setEmail('');
    }, 1500);
  };

  return (
    <footer className="bg-muted pt-24 pb-12 px-6 text-muted-foreground">
      <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
        
        <div className="md:col-span-4">
          <h4 className="text-2xl font-serif text-foreground mb-6">VidaFarma</h4>
          <p className="max-w-xs font-light leading-relaxed">
            Tu destino de salud y belleza en Pedro Juan Caballero. 
            Cuidando de ti y de tu familia con dedicación.
          </p>
        </div>

        <div className="md:col-span-2">
          <h4 className="font-medium text-foreground mb-6 tracking-wide text-sm uppercase">Tienda</h4>
          <ul className="space-y-4 font-light">
            <li><Link href="/store" className="hover:text-primary transition-colors underline-offset-4 hover:underline">Ver Todo</Link></li>
            <li><Link href="/store" className="hover:text-primary transition-colors underline-offset-4 hover:underline">Novedades</Link></li>
            <li><Link href="/store" className="hover:text-primary transition-colors underline-offset-4 hover:underline">Perfumería</Link></li>
            <li><Link href="/store" className="hover:text-primary transition-colors underline-offset-4 hover:underline">Farmacia</Link></li>
          </ul>
        </div>
        
        <div className="md:col-span-2">
          <h4 className="font-medium text-foreground mb-6 tracking-wide text-sm uppercase">Empresa</h4>
          <ul className="space-y-4 font-light">
            <li><Link href="/#about" className="hover:text-primary transition-colors underline-offset-4 hover:underline">Nosotros</Link></li>
            <li><Link href="/#about" className="hover:text-primary transition-colors underline-offset-4 hover:underline">Ubicación</Link></li>
            <li><Link href="/#journal" className="hover:text-primary transition-colors underline-offset-4 hover:underline">Blog de Salud</Link></li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <h4 className="font-medium text-foreground mb-6 tracking-wide text-sm uppercase">Boletín</h4>
          <div className="flex flex-col gap-4">
            <input 
              type="email" 
              placeholder="tu@email.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={subscribeStatus === 'loading' || subscribeStatus === 'success'}
              className="bg-transparent border-b border-border py-2 text-lg outline-none focus:border-primary transition-colors placeholder-muted-foreground/70 text-foreground disabled:opacity-50" 
            />
            <button 
              onClick={handleSubscribe}
              disabled={subscribeStatus !== 'idle' || !email}
              className="self-start text-sm font-medium uppercase tracking-widest mt-2 hover:text-primary disabled:cursor-default disabled:hover:text-muted-foreground disabled:opacity-50 transition-opacity"
            >
              {subscribeStatus === 'idle' && 'Suscribirse'}
              {subscribeStatus === 'loading' && 'Suscribiendo...'}
              {subscribeStatus === 'success' && 'Suscrito'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto mt-20 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center text-xs uppercase tracking-widest opacity-60">
        <p>Pedro Juan Caballero, Paraguay</p>
      </div>
    </footer>
  );
};

export default Footer;
