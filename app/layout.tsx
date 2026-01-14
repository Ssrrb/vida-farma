import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/providers/Providers';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Assistant from '@/components/Assistant';
import CartDrawer from '@/components/CartDrawer';
import { fetchCategories } from '@/services/categoryService.js';
import { CategoryGroup } from '@/types';

// We use the direct service since this is a Server Component

export const metadata: Metadata = {
  title: 'VidaFarma - Perfumería y Farmacia en PJC',
  description: 'VidaFarma - Salud y Belleza en Pedro Juan Caballero, Paraguay',
};

async function getCategories() {
  try {
    const categories = await fetchCategories() as CategoryGroup[];
    // Transform to simple array of strings for Navbar as it expects strings
    // The service returns { name: string, subcategories: string[] }[]
    // Navbar expects string[] (just names)
    return ['Todo', ...categories.map((c) => c.name)];
  } catch (error) {
    console.error("Failed to fetch categories", error);
    return ['Todo'];
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategories();

  return (
    <html lang="es">
      <body className="font-sans bg-[#F5F2EB] text-[#2C2A26] selection:bg-[#D6D1C7] selection:text-[#2C2A26]">
        <Providers>
          <Navbar categories={categories} />
          <main className="min-h-screen pt-[80px]">
            {children}
          </main>
          <Footer />
          <Assistant />
          <CartDrawer />
        </Providers>
      </body>
    </html>
  );
}