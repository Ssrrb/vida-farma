import { pool } from './db.js';

export const fetchCategories = async () => {
  const result = await pool.query(`
    SELECT name
    FROM categories
    ORDER BY sort_order ASC, name ASC;
  `);

  return result.rows.map((row) => row.name);
};
