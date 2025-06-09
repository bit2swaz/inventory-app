-- Drop tables if they exist
DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS categories;

-- Create categories table
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  description TEXT
);

-- Create items table
CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10,2),
  quantity INTEGER,
  image_url TEXT,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE
); 