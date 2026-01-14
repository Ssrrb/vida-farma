'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { JournalArticle } from '../types';

interface JournalDetailProps {
  article: JournalArticle;
}

const JournalDetail: React.FC<JournalDetailProps> = ({ article }) => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background animate-fade-in-up">
       {/* Hero Image for Article - Full bleed to top so navbar sits on it */}
       <div className="w-full h-[50vh] md:h-[60vh] relative overflow-hidden">
          <img 
             src={article.image} 
             alt={article.title} 
             className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20"></div>
       </div>

       <div className="max-w-3xl mx-auto px-6 md:px-12 -mt-32 relative z-10 pb-32">
          <div className="bg-background p-8 md:p-16 shadow-2xl shadow-primary/10 rounded-2xl border border-border">
             <div className="flex justify-between items-center mb-12 border-b border-border pb-8">
                <button 
                  onClick={() => router.back()}
                  className="group flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-1 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                  Volver al Blog
                </button>
                <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">{article.date}</span>
             </div>

             <h1 className="text-4xl md:text-6xl font-serif text-foreground mb-12 leading-tight text-center">
               {article.title}
             </h1>

             <div className="prose prose-stone prose-lg mx-auto font-light leading-loose text-muted-foreground">
               {article.content}
             </div>
             
             <div className="mt-16 pt-12 border-t border-border flex justify-center">
                 <span className="text-2xl font-serif italic text-primary">VidaFarma</span>
             </div>
          </div>
       </div>
    </div>
  );
};

export default JournalDetail;
