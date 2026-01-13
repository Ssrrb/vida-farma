import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config({ path: '.env.local' });

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not set. Add it to .env.local.');
}

export const pool = new Pool({
  connectionString: databaseUrl
});
