const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: 'localhost',
  database: 'tech_gadget_inventory',
  port: 5432,
  user: 'adityaa'
});

module.exports = {
  query: (text, params) => pool.query(text, params),
}; 