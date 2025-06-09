require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: { rejectUnauthorized: false }
});

const initDatabase = async () => {
  try {
    console.log('Initializing database on Render...');
    
    // Read the SQL file
    const sqlPath = path.join(__dirname, '..', 'db', 'init.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    
    // Execute the SQL
    await pool.query(sql);
    console.log('Database schema created successfully');
    
    // Insert sample data
    console.log('Inserting sample data...');
    
    // Insert categories
    const laptopsResult = await pool.query(
      'INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING id',
      ['Laptops', 'Powerful portable computers for work and play']
    );
    const laptopsCategoryId = laptopsResult.rows[0].id;
    
    const smartphonesResult = await pool.query(
      'INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING id',
      ['Smartphones', 'Latest mobile devices with cutting-edge features']
    );
    const smartphonesCategoryId = smartphonesResult.rows[0].id;
    
    const accessoriesResult = await pool.query(
      'INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING id',
      ['Accessories', 'Essential add-ons for your tech gadgets']
    );
    const accessoriesCategoryId = accessoriesResult.rows[0].id;
    
    // Insert laptop items
    await pool.query(
      'INSERT INTO items (name, description, price, quantity, image_url, category_id) VALUES ($1, $2, $3, $4, $5, $6)',
      [
        'MacBook Pro 16"', 
        'Apple M2 Pro chip, 16GB RAM, 512GB SSD, 16-inch Liquid Retina XDR display',
        2499.99,
        15,
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1626&q=80',
        laptopsCategoryId
      ]
    );
    
    // Insert smartphone items
    await pool.query(
      'INSERT INTO items (name, description, price, quantity, image_url, category_id) VALUES ($1, $2, $3, $4, $5, $6)',
      [
        'iPhone 15 Pro', 
        'A17 Pro chip, 6.1" Super Retina XDR display, 48MP camera system, 256GB storage',
        1199.99,
        42,
        'https://images.unsplash.com/photo-1695048133142-1a20484d2569?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        smartphonesCategoryId
      ]
    );
    
    // Insert accessory items
    await pool.query(
      'INSERT INTO items (name, description, price, quantity, image_url, category_id) VALUES ($1, $2, $3, $4, $5, $6)',
      [
        'AirPods Pro (2nd Gen)', 
        'Active Noise Cancellation, Transparency mode, Adaptive EQ, Spatial Audio',
        249.99,
        50,
        'https://images.unsplash.com/photo-1606741965429-8cc3d4a3302f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
        accessoriesCategoryId
      ]
    );
    
    console.log('Sample data inserted successfully');
    
  } catch (err) {
    console.error('Error initializing database:', err);
  } finally {
    await pool.end();
  }
};

initDatabase(); 