import { pool } from './db.js';

const mapProductRow = (row) => ({
  id: row.id,
  name: row.name,
  tagline: row.tagline,
  description: row.description,
  longDescription: row.long_description,
  price: row.price,
  category: row.category,
  imageUrl: row.image_url,
  gallery: row.gallery ?? [],
  features: row.features ?? []
});

export const fetchProducts = async () => {
  const result = await pool.query(`
    SELECT
      id,
      name,
      tagline,
      description,
      long_description,
      price,
      category,
      image_url,
      gallery,
      features
    FROM products
    ORDER BY name ASC;
  `);

  return result.rows.map(mapProductRow);
};
