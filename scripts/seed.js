require('dotenv').config();
const { Pool } = require('pg');

// Use direct connection parameters with username
const pool = new Pool({
  host: 'localhost',
  database: 'tech_gadget_inventory',
  port: 5432,
  user: 'adityaa'
});

const seedCategories = [
  {
    name: 'Laptops',
    description: 'Portable computers for work and entertainment'
  },
  {
    name: 'Smartphones',
    description: 'Mobile devices for communication and productivity'
  },
  {
    name: 'Accessories',
    description: 'Enhance your tech experience with these gadgets'
  }
];

const seedItems = [
  // Laptops
  {
    name: 'MacBook Pro 16"',
    description: 'Powerful laptop with M1 Pro chip, 16GB RAM, and 512GB SSD',
    price: 2499.99,
    quantity: 10,
    image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1626&q=80',
    category_name: 'Laptops'
  },
  {
    name: 'Dell XPS 15',
    description: 'Premium Windows laptop with 11th Gen Intel Core i7, 16GB RAM, and 1TB SSD',
    price: 1899.99,
    quantity: 8,
    image_url: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80',
    category_name: 'Laptops'
  },
  {
    name: 'Lenovo ThinkPad X1 Carbon',
    description: 'Business laptop with 12th Gen Intel Core i5, 16GB RAM, and 512GB SSD',
    price: 1599.99,
    quantity: 12,
    image_url: 'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80',
    category_name: 'Laptops'
  },
  
  // Smartphones
  {
    name: 'iPhone 14 Pro',
    description: 'Latest iPhone with A16 Bionic chip, 6.1" display, and 128GB storage',
    price: 999.99,
    quantity: 15,
    image_url: 'https://images.unsplash.com/photo-1663761879666-f7fa383a449d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80',
    category_name: 'Smartphones'
  },
  {
    name: 'Samsung Galaxy S23 Ultra',
    description: 'Premium Android phone with Snapdragon 8 Gen 2, 6.8" display, and 256GB storage',
    price: 1199.99,
    quantity: 10,
    image_url: 'https://images.unsplash.com/photo-1676380367144-2b0a8e930c8e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80',
    category_name: 'Smartphones'
  },
  {
    name: 'Google Pixel 7 Pro',
    description: 'Google flagship with Tensor G2 chip, 6.7" display, and 128GB storage',
    price: 899.99,
    quantity: 8,
    image_url: 'https://images.unsplash.com/photo-1667831268948-e2c9eeaad276?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80',
    category_name: 'Smartphones'
  },
  
  // Accessories
  {
    name: 'AirPods Pro',
    description: 'Wireless earbuds with active noise cancellation and spatial audio',
    price: 249.99,
    quantity: 20,
    image_url: 'https://images.unsplash.com/photo-1606741965740-7802e04be2f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80',
    category_name: 'Accessories'
  },
  {
    name: 'Apple Watch Series 8',
    description: 'Smartwatch with health tracking, GPS, and cellular connectivity',
    price: 399.99,
    quantity: 15,
    image_url: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80',
    category_name: 'Accessories'
  },
  {
    name: 'Logitech MX Master 3',
    description: 'Advanced wireless mouse with customizable buttons and ergonomic design',
    price: 99.99,
    quantity: 25,
    image_url: 'https://images.unsplash.com/photo-1605773527852-c546a8584ea3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80',
    category_name: 'Accessories'
  }
];

async function seed() {
  try {
    console.log('Starting database seeding...');
    
    // Clear existing data
    await pool.query('DELETE FROM items');
    await pool.query('DELETE FROM categories');
    
    console.log('Cleared existing data');
    
    // Insert categories
    const categoryMap = {};
    
    for (const category of seedCategories) {
      const result = await pool.query(
        'INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING id',
        [category.name, category.description]
      );
      
      categoryMap[category.name] = result.rows[0].id;
      console.log(`Added category: ${category.name}`);
    }
    
    // Insert items
    for (const item of seedItems) {
      const categoryId = categoryMap[item.category_name];
      
      await pool.query(
        'INSERT INTO items (name, description, price, quantity, image_url, category_id) VALUES ($1, $2, $3, $4, $5, $6)',
        [item.name, item.description, item.price, item.quantity, item.image_url, categoryId]
      );
      
      console.log(`Added item: ${item.name}`);
    }
    
    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await pool.end();
  }
}

seed(); 