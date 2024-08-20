
import pg from "pg";
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_CONNECTION_STRING + "?sslmode=required",
});
export const query = (text: string, params?: any[]) => pool.query(text, params);
