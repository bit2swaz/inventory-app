-- Insert categories
INSERT INTO categories (name, description) VALUES 
('Laptops', 'Portable computers for work and entertainment'),
('Smartphones', 'Mobile devices for communication and productivity'),
('Accessories', 'Enhance your tech experience with these gadgets');

-- Get the IDs for reference
SELECT id, name FROM categories;

-- Insert items for Laptops (assuming ID 1)
INSERT INTO items (name, description, price, quantity, image_url, category_id) VALUES 
('MacBook Pro 16"', 'Powerful laptop with M1 Pro chip, 16GB RAM, and 512GB SSD', 2499.99, 10, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8', 1),
('Dell XPS 15', 'Premium Windows laptop with 11th Gen Intel Core i7, 16GB RAM, and 1TB SSD', 1899.99, 8, 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45', 1);

-- Insert items for Smartphones (assuming ID 2)
INSERT INTO items (name, description, price, quantity, image_url, category_id) VALUES 
('iPhone 14 Pro', 'Latest iPhone with A16 Bionic chip, 6.1" display, and 128GB storage', 999.99, 15, 'https://images.unsplash.com/photo-1663761879666-f7fa383a449d', 2),
('Samsung Galaxy S23 Ultra', 'Premium Android phone with Snapdragon 8 Gen 2, 6.8" display, and 256GB storage', 1199.99, 10, 'https://images.unsplash.com/photo-1676380367144-2b0a8e930c8e', 2);

-- Insert items for Accessories (assuming ID 3)
INSERT INTO items (name, description, price, quantity, image_url, category_id) VALUES 
('AirPods Pro', 'Wireless earbuds with active noise cancellation and spatial audio', 249.99, 20, 'https://images.unsplash.com/photo-1606741965740-7802e04be2f6', 3),
('Apple Watch Series 8', 'Smartwatch with health tracking, GPS, and cellular connectivity', 399.99, 15, 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a', 3); 