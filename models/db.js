const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'gadget_inventory',
  port: process.env.DB_PORT || 5432,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool
}; 