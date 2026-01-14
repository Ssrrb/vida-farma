'use client';

import React from 'react';
import Link from 'next/link';
import { JOURNAL_ARTICLES } from '../constants';

const Journal: React.FC = () => {
  return (
    <section id="journal" className="bg-background py-32 px-6 md:px-12">
      <div className="max-w-[1800px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 pb-8 border-b border-border">
            <div>
                <span className="block text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">Editorial</span>
                <h2 className="text-4xl md:text-6xl font-serif text-foreground">Blog</h2>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {JOURNAL_ARTICLES.map((article) => (
                <Link href={`/journal/${article.id}`} key={article.id} className="group cursor-pointer flex flex-col text-left">
                    <div className="w-full aspect-[4/3] overflow-hidden mb-8 bg-muted rounded-2xl shadow-sm">
                        <img 
                            src={article.image} 
                            alt={article.title} 
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                    </div>
                    <div className="flex flex-col flex-1 text-left">
                        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-3">{article.date}</span>
                        <h3 className="text-2xl font-serif text-foreground mb-4 leading-tight group-hover:text-primary transition-colors decoration-1 underline-offset-4">{article.title}</h3>
                        <p className="text-muted-foreground font-light leading-relaxed">{article.excerpt}</p>
                    </div>
                </Link>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Journal;
