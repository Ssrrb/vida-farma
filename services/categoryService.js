import { pool } from './db.js';

export const fetchCategories = async () => {
  const result = await pool.query(`
    SELECT
      c.name,
      COALESCE(
        array_agg(sc.name ORDER BY sc.sort_order ASC, sc.name ASC)
          FILTER (WHERE sc.name IS NOT NULL),
        ARRAY[]::TEXT[]
      ) AS subcategories
    FROM categories c
    LEFT JOIN subcategories sc
      ON sc.category_name = c.name
    GROUP BY c.name, c.sort_order
    ORDER BY c.sort_order ASC, c.name ASC;
  `);

  return result.rows.map((row) => ({
    name: row.name,
    subcategories: row.subcategories ?? []
  }));
};
