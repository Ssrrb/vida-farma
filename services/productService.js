import { pool } from './db.js';

const mapProductRow = (row) => ({
  id: row.id,
  name: row.name,
  tagline: row.tagline,
  description: row.description,
  longDescription: row.long_description,
  price: row.price,
  brandName: row.brand_name,
  discountPercent: row.discount_percent,
  discountStartsAt: row.discount_starts_at,
  discountEndsAt: row.discount_ends_at,
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
      brand_name,
      discount_percent,
      discount_starts_at,
      discount_ends_at,
      category,
      image_url,
      gallery,
      features
    FROM products
    ORDER BY name ASC;
  `);

  return result.rows.map(mapProductRow);
};

export const fetchProductById = async (id) => {
  const result = await pool.query(`
    SELECT
      id,
      name,
      tagline,
      description,
      long_description,
      price,
      brand_name,
      discount_percent,
      discount_starts_at,
      discount_ends_at,
      category,
      image_url,
      gallery,
      features
    FROM products
    WHERE id = $1;
  `, [id]);

  if (result.rows.length === 0) {
    return null;
  }

  return mapProductRow(result.rows[0]);
};
