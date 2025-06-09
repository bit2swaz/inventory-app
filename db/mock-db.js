// Mock database for local testing
const mockData = {
  categories: [
    { id: 1, name: 'Laptops', description: 'Portable computers for work and entertainment' },
    { id: 2, name: 'Smartphones', description: 'Mobile devices for communication and productivity' },
    { id: 3, name: 'Accessories', description: 'Enhance your tech experience with these gadgets' }
  ],
  items: [
    { 
      id: 1, 
      name: 'MacBook Pro 16"', 
      description: 'Powerful laptop with M1 Pro chip, 16GB RAM, and 512GB SSD', 
      price: 2499.99, 
      quantity: 10, 
      image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8', 
      category_id: 1,
      category_name: 'Laptops'
    },
    { 
      id: 2, 
      name: 'Dell XPS 15', 
      description: 'Premium Windows laptop with 11th Gen Intel Core i7, 16GB RAM, and 1TB SSD', 
      price: 1899.99, 
      quantity: 8, 
      image_url: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45', 
      category_id: 1,
      category_name: 'Laptops'
    },
    { 
      id: 3, 
      name: 'iPhone 14 Pro', 
      description: 'Latest iPhone with A16 Bionic chip, 6.1" display, and 128GB storage', 
      price: 999.99, 
      quantity: 15, 
      image_url: 'https://images.unsplash.com/photo-1663761879666-f7fa383a449d', 
      category_id: 2,
      category_name: 'Smartphones'
    },
    { 
      id: 4, 
      name: 'Samsung Galaxy S23 Ultra', 
      description: 'Premium Android phone with Snapdragon 8 Gen 2, 6.8" display, and 256GB storage', 
      price: 1199.99, 
      quantity: 10, 
      image_url: 'https://images.unsplash.com/photo-1676380367144-2b0a8e930c8e', 
      category_id: 2,
      category_name: 'Smartphones'
    },
    { 
      id: 5, 
      name: 'AirPods Pro', 
      description: 'Wireless earbuds with active noise cancellation and spatial audio', 
      price: 249.99, 
      quantity: 20, 
      image_url: 'https://images.unsplash.com/photo-1606741965740-7802e04be2f6', 
      category_id: 3,
      category_name: 'Accessories'
    },
    { 
      id: 6, 
      name: 'Apple Watch Series 8', 
      description: 'Smartwatch with health tracking, GPS, and cellular connectivity', 
      price: 399.99, 
      quantity: 15, 
      image_url: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a', 
      category_id: 3,
      category_name: 'Accessories'
    }
  ]
};

let nextCategoryId = 4;
let nextItemId = 7;

// Mock query function
const query = async (text, params) => {
  // Handle different SQL queries
  if (text === 'SELECT * FROM categories ORDER BY name') {
    return { rows: [...mockData.categories] };
  }
  
  if (text.includes('SELECT * FROM categories WHERE id = $1')) {
    const id = params[0];
    const category = mockData.categories.find(c => c.id === Number(id));
    return { rows: category ? [category] : [] };
  }
  
  if (text.includes('INSERT INTO categories')) {
    const [name, description] = params;
    const newCategory = { id: nextCategoryId++, name, description };
    mockData.categories.push(newCategory);
    return { rows: [newCategory] };
  }
  
  if (text.includes('UPDATE categories SET')) {
    const [name, description, id] = params;
    const index = mockData.categories.findIndex(c => c.id === Number(id));
    if (index !== -1) {
      mockData.categories[index] = { ...mockData.categories[index], name, description };
      return { rows: [mockData.categories[index]] };
    }
    return { rows: [] };
  }
  
  if (text.includes('DELETE FROM categories WHERE id = $1')) {
    const id = params[0];
    const index = mockData.categories.findIndex(c => c.id === Number(id));
    if (index !== -1) {
      mockData.categories.splice(index, 1);
    }
    return { rows: [] };
  }
  
  if (text.includes('SELECT COUNT(*) FROM items WHERE category_id = $1')) {
    const categoryId = params[0];
    const count = mockData.items.filter(i => i.category_id === Number(categoryId)).length;
    return { rows: [{ count }] };
  }
  
  if (text.includes('SELECT i.*, c.name as category_name FROM items i JOIN categories c')) {
    if (text.includes('WHERE i.id = $1')) {
      const id = params[0];
      const item = mockData.items.find(i => i.id === Number(id));
      return { rows: item ? [item] : [] };
    }
    return { rows: [...mockData.items] };
  }
  
  if (text.includes('SELECT * FROM items WHERE category_id = $1')) {
    const categoryId = params[0];
    const items = mockData.items.filter(i => i.category_id === Number(categoryId));
    return { rows: items };
  }
  
  if (text.includes('INSERT INTO items')) {
    const [name, description, price, quantity, image_url, category_id] = params;
    const category = mockData.categories.find(c => c.id === Number(category_id));
    const newItem = { 
      id: nextItemId++, 
      name, 
      description, 
      price: Number(price), 
      quantity: Number(quantity), 
      image_url, 
      category_id: Number(category_id),
      category_name: category ? category.name : 'Unknown'
    };
    mockData.items.push(newItem);
    return { rows: [newItem] };
  }
  
  if (text.includes('UPDATE items SET')) {
    const [name, description, price, quantity, image_url, category_id, id] = params;
    const index = mockData.items.findIndex(i => i.id === Number(id));
    if (index !== -1) {
      const category = mockData.categories.find(c => c.id === Number(category_id));
      mockData.items[index] = { 
        ...mockData.items[index], 
        name, 
        description, 
        price: Number(price), 
        quantity: Number(quantity), 
        image_url, 
        category_id: Number(category_id),
        category_name: category ? category.name : 'Unknown'
      };
      return { rows: [mockData.items[index]] };
    }
    return { rows: [] };
  }
  
  if (text.includes('DELETE FROM items WHERE id = $1')) {
    const id = params[0];
    const index = mockData.items.findIndex(i => i.id === Number(id));
    if (index !== -1) {
      mockData.items.splice(index, 1);
    }
    return { rows: [] };
  }
  
  // Default fallback
  return { rows: [] };
};

module.exports = {
  query
}; 