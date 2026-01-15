
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

export type Category = 
  | 'Medicamentos' 
  | 'Perfumes' 
  | 'Higiene' 
  | 'Salud' 
  | 'Dermocosmetica' 
  | 'Bebé y Mamá' 
  | 'Nutrición y Deporte';

export interface CategoryGroup {
  name: string;
  subcategories: string[];
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  longDescription?: string;
  price: number;
  brandName?: string;
  discountPercent?: number;
  discountStartsAt?: string;
  discountEndsAt?: string;
  category: Category;
  imageUrl: string;
  gallery?: string[];
  features: string[];
}

export interface JournalArticle {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  content: React.ReactNode; 
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS'
}

export type ViewState = 
  | { type: 'home' }
  | { type: 'store', category?: string, searchQuery?: string }
  | { type: 'product', product: Product }
  | { type: 'journal', article: JournalArticle }
  | { type: 'checkout' };
