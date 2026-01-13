
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import About from './components/About';
import Journal from './components/Journal';
import Assistant from './components/Assistant';
import Footer from './components/Footer';
import ProductDetail from './components/ProductDetail';
import JournalDetail from './components/JournalDetail';
import CartDrawer from './components/CartDrawer';
import Checkout from './components/Checkout';
import Store from './components/Store';
import { Product, JournalArticle, ViewState } from './types';
import { PRODUCTS } from './constants';
import { fetchProducts } from './services/productApi';
import { fetchCategories } from './services/categoryApi';

function App() {
  const [view, setView] = useState<ViewState>({ type: 'home' });
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    let isActive = true;

    const deriveCategoriesFromProducts = (items: Product[]) => {
      const seen = new Set<string>();
      const result: string[] = [];
      items.forEach((item) => {
        if (!seen.has(item.category)) {
          seen.add(item.category);
          result.push(item.category);
        }
      });
      return result;
    };

    const loadData = async () => {
      const [productsResult, categoriesResult] = await Promise.allSettled([
        fetchProducts(),
        fetchCategories()
      ]);

      if (!isActive) {
        return;
      }

      const productData =
        productsResult.status === 'fulfilled' ? productsResult.value : PRODUCTS;
      setProducts(productData);

      if (categoriesResult.status === 'fulfilled' && categoriesResult.value.length > 0) {
        setCategories(categoriesResult.value);
      } else {
        setCategories(deriveCategoriesFromProducts(productData));
      }
    };

    loadData();

    return () => {
      isActive = false;
    };
  }, []);

  // Handle navigation (clicks on Navbar or Footer links)
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    
    // If we are not home and not requesting the store, go home first
    if (view.type !== 'home') {
      setView({ type: 'home' });
      // Allow state update to render Home before scrolling
      setTimeout(() => scrollToSection(targetId), 0);
    } else {
      scrollToSection(targetId);
    }
  };

  const handleSearch = (query: string) => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setView({ type: 'store', searchQuery: query, category: 'Todo' });
  };

  const handleCategorySelect = (category: string) => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setView({ type: 'store', category: category, searchQuery: '' });
  };

  const scrollToSection = (targetId: string) => {
    if (!targetId) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }
    
    const element = document.getElementById(targetId);
    if (element) {
      // Manual scroll calculation to account for fixed header
      const headerOffset = 85;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      try {
        window.history.pushState(null, '', `#${targetId}`);
      } catch (err) {
        // Ignore SecurityError in restricted environments
      }
    }
  };

  const addToCart = (product: Product) => {
    setCartItems([...cartItems, product]);
    setIsCartOpen(true);
  };

  const removeFromCart = (index: number) => {
    const newItems = [...cartItems];
    newItems.splice(index, 1);
    setCartItems(newItems);
  };

  return (
    <div className="min-h-screen bg-[#F5F2EB] font-sans text-[#2C2A26] selection:bg-[#D6D1C7] selection:text-[#2C2A26]">
      {view.type !== 'checkout' && (
        <Navbar 
            onNavClick={handleNavClick} 
            onSearch={handleSearch}
            onCategorySelect={handleCategorySelect}
            cartCount={cartItems.length}
            onOpenCart={() => setIsCartOpen(true)}
            categories={categories}
        />
      )}
      
      <main>
        {view.type === 'home' && (
          <>
            <Hero />
            <ProductGrid onProductClick={(p) => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setView({ type: 'product', product: p });
            }} products={products} />
            <About />
            <Journal onArticleClick={(a) => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setView({ type: 'journal', article: a });
            }} />
          </>
        )}

        {view.type === 'store' && (
            <Store 
                initialCategory={view.category}
                initialSearch={view.searchQuery}
                onProductClick={(p) => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    setView({ type: 'product', product: p });
                }}
                products={products}
                categories={['Todo', ...categories.filter((category) => category !== 'Todo')]}
            />
        )}

        {view.type === 'product' && (
          <ProductDetail 
            product={view.product} 
            onBack={() => {
              setView({ type: 'home' }); // Default back to home, or could check history
              // If coming from store, could potentially go back to store state, but keeping it simple for now
            }}
            onAddToCart={addToCart}
          />
        )}

        {view.type === 'journal' && (
          <JournalDetail 
            article={view.article} 
            onBack={() => setView({ type: 'home' })}
          />
        )}

        {view.type === 'checkout' && (
            <Checkout 
                items={cartItems}
                onBack={() => setView({ type: 'home' })}
            />
        )}
      </main>

      {view.type !== 'checkout' && <Footer onLinkClick={handleNavClick} />}
      
      <Assistant />
      
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={removeFromCart}
        onCheckout={() => {
            setIsCartOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setView({ type: 'checkout' });
        }}
      />
    </div>
  );
}

export default App;
