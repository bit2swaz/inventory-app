const db = require('../db');
require('dotenv').config();

// Sample data for categories
const categories = [
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
    description: 'Add-ons and peripherals for your tech devices'
  }
];

// Sample data for items (2 per category)
const items = [
  // Laptops
  {
    name: 'MacBook Pro 16"',
    description: 'Apple M2 Pro chip, 16GB RAM, 512GB SSD',
    price: 2499.99,
    stock: 10,
    category: 'Laptops'
  },
  {
    name: 'Dell XPS 15',
    description: 'Intel i7, 32GB RAM, 1TB SSD, NVIDIA RTX 3050',
    price: 1899.99,
    stock: 15,
    category: 'Laptops'
  },
  // Smartphones
  {
    name: 'iPhone 15 Pro',
    description: 'A17 Bionic chip, 256GB storage, 6.1" display',
    price: 1099.99,
    stock: 25,
    category: 'Smartphones'
  },
  {
    name: 'Samsung Galaxy S23 Ultra',
    description: 'Snapdragon 8 Gen 2, 512GB storage, 6.8" AMOLED display',
    price: 1199.99,
    stock: 20,
    category: 'Smartphones'
  },
  // Accessories
  {
    name: 'AirPods Pro 2',
    description: 'Wireless earbuds with active noise cancellation',
    price: 249.99,
    stock: 30,
    category: 'Accessories'
  },
  {
    name: 'Logitech MX Master 3',
    description: 'Advanced wireless mouse for productivity',
    price: 99.99,
    stock: 40,
    category: 'Accessories'
  }
];

// Function to insert categories
async function insertCategories() {
  console.log('Inserting categories...');
  for (const category of categories) {
    try {
      await db.query(
        'INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING id',
        [category.name, category.description]
      );
      console.log(`Category "${category.name}" inserted successfully`);
    } catch (err) {
      console.error(`Error inserting category "${category.name}":`, err.message);
    }
  }
}

// Function to insert items
async function insertItems() {
  console.log('Inserting items...');
  for (const item of items) {
    try {
      // Get category ID
      const categoryResult = await db.query('SELECT id FROM categories WHERE name = $1', [item.category]);
      
      if (categoryResult.rows.length === 0) {
        console.error(`Category "${item.category}" not found for item "${item.name}"`);
        continue;
      }
      
      const categoryId = categoryResult.rows[0].id;
      
      // Insert item
      await db.query(
        'INSERT INTO items (name, description, price, category_id, stock) VALUES ($1, $2, $3, $4, $5)',
        [item.name, item.description, item.price, categoryId, item.stock]
      );
      
      console.log(`Item "${item.name}" inserted successfully`);
    } catch (err) {
      console.error(`Error inserting item "${item.name}":`, err.message);
    }
  }
}

// Main function to seed the database
async function seedDatabase() {
  try {
    // Insert categories first
    await insertCategories();
    
    // Then insert items (which depend on categories)
    await insertItems();
    
    console.log('Database seeding completed successfully');
  } catch (err) {
    console.error('Error seeding database:', err.message);
  } finally {
    // Close the database connection
    db.pool.end();
  }
}

// Run the seed function
seedDatabase(); 