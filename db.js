import pg from 'pg';
const { Pool } = pg;
const db = new Pool({
  user: "postgres",
  host: "localhost",
  database: "book_notes",
  password: "postgres",
  port: 5432,
});
export default db;