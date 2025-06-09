const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Get database connection string from environment variables
const connectionString = process.env.DATABASE_URL || `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

// Create a new pool instance
const pool = new Pool({
  connectionString,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Function to initialize the database
async function initializeDatabase() {
  try {
    // Read the SQL file
    const sqlFilePath = path.join(__dirname, '..', 'db', 'init.sql');
    const sqlScript = fs.readFileSync(sqlFilePath, 'utf8');

    console.log('Initializing database...');
    
    // Execute the SQL script
    await pool.query(sqlScript);
    
    console.log('Database initialized successfully!');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    // Close the pool
    await pool.end();
  }
}

// Run the initialization function
initializeDatabase(); 