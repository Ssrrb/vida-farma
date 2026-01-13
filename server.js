import dotenv from 'dotenv';
import express from 'express';
import { fetchProducts } from './services/productService.js';
import { fetchCategories } from './services/categoryService.js';

dotenv.config({ path: '.env.local' });

const app = express();
const port = Number(process.env.PORT) || 3001;

app.get('/api/products', async (_req, res) => {
  try {
    const products = await fetchProducts();
    res.json(products);
  } catch (error) {
    console.error('Failed to load products:', error);
    res.status(500).json({ error: 'Failed to load products' });
  }
});

app.get('/api/categories', async (_req, res) => {
  try {
    const categories = await fetchCategories();
    res.json(categories);
  } catch (error) {
    console.error('Failed to load categories:', error);
    res.status(500).json({ error: 'Failed to load categories' });
  }
});

app.listen(port, () => {
  console.log(`API server listening on http://localhost:${port}`);
});
