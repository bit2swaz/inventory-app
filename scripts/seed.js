require('dotenv').config({ path: '../.env' });
const { Pool } = require('pg');

const pool = new Pool({
  host: 'localhost',
  database: 'gadget_inventory',
  port: 5432,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

const seedDatabase = async () => {
  try {
    // Clear existing data
    await pool.query('DELETE FROM items');
    await pool.query('DELETE FROM categories');
    
    console.log('Cleared existing data');
    
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
    
    console.log('Added categories');
    
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
    
    await pool.query(
      'INSERT INTO items (name, description, price, quantity, image_url, category_id) VALUES ($1, $2, $3, $4, $5, $6)',
      [
        'Dell XPS 15', 
        '12th Gen Intel Core i7, 16GB RAM, 1TB SSD, NVIDIA GeForce RTX 3050 Ti',
        1899.99,
        23,
        'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80',
        laptopsCategoryId
      ]
    );
    
    await pool.query(
      'INSERT INTO items (name, description, price, quantity, image_url, category_id) VALUES ($1, $2, $3, $4, $5, $6)',
      [
        'Lenovo ThinkPad X1 Carbon', 
        'Intel Core i7, 16GB RAM, 512GB SSD, 14" FHD+ display, Windows 11 Pro',
        1599.99,
        18,
        'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
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
    
    await pool.query(
      'INSERT INTO items (name, description, price, quantity, image_url, category_id) VALUES ($1, $2, $3, $4, $5, $6)',
      [
        'Samsung Galaxy S23 Ultra', 
        'Snapdragon 8 Gen 2, 12GB RAM, 512GB storage, 6.8" Dynamic AMOLED 2X, 200MP camera',
        1299.99,
        35,
        'https://images.unsplash.com/photo-1678911820864-e2c567c655d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        smartphonesCategoryId
      ]
    );
    
    await pool.query(
      'INSERT INTO items (name, description, price, quantity, image_url, category_id) VALUES ($1, $2, $3, $4, $5, $6)',
      [
        'Google Pixel 7 Pro', 
        'Google Tensor G2, 12GB RAM, 256GB storage, 6.7" QHD+ LTPO OLED display, 50MP triple camera',
        899.99,
        28,
        'https://images.unsplash.com/photo-1667831281320-19839c7ce4c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80',
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
    
    await pool.query(
      'INSERT INTO items (name, description, price, quantity, image_url, category_id) VALUES ($1, $2, $3, $4, $5, $6)',
      [
        'Samsung Galaxy Watch 6', 
        '44mm, Bluetooth, BioActive Sensor, Body Composition Analysis, Advanced Sleep Coaching',
        329.99,
        40,
        'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80',
        accessoriesCategoryId
      ]
    );
    
    await pool.query(
      'INSERT INTO items (name, description, price, quantity, image_url, category_id) VALUES ($1, $2, $3, $4, $5, $6)',
      [
        'Anker 737 Power Bank', 
        '24,000mAh, 140W Output, USB-C Power Delivery, Digital Display',
        149.99,
        65,
        'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80',
        accessoriesCategoryId
      ]
    );
    
    console.log('Added items');
    console.log('Database seeded successfully!');
    
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    await pool.end();
  }
};

seedDatabase(); 