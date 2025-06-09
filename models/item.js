const db = require('../db/db');

class Item {
  // Get all items
  static async getAll() {
    const result = await db.query(`
      SELECT i.*, c.name as category_name 
      FROM items i 
      JOIN categories c ON i.category_id = c.id
      ORDER BY i.name
    `);
    return result.rows;
  }

  // Get item by ID
  static async getById(id) {
    const result = await db.query(`
      SELECT i.*, c.name as category_name 
      FROM items i 
      JOIN categories c ON i.category_id = c.id
      WHERE i.id = $1
    `, [id]);
    return result.rows[0];
  }

  // Get items by category ID
  static async getByCategoryId(categoryId) {
    const result = await db.query('SELECT * FROM items WHERE category_id = $1 ORDER BY name', [categoryId]);
    return result.rows;
  }

  // Create new item
  static async create(name, description, price, quantity, imageUrl, categoryId) {
    const result = await db.query(
      'INSERT INTO items (name, description, price, quantity, image_url, category_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, description, price, quantity, imageUrl, categoryId]
    );
    return result.rows[0];
  }

  // Update item
  static async update(id, name, description, price, quantity, imageUrl, categoryId) {
    const result = await db.query(
      'UPDATE items SET name = $1, description = $2, price = $3, quantity = $4, image_url = $5, category_id = $6 WHERE id = $7 RETURNING *',
      [name, description, price, quantity, imageUrl, categoryId, id]
    );
    return result.rows[0];
  }

  // Delete item
  static async delete(id) {
    await db.query('DELETE FROM items WHERE id = $1', [id]);
    return true;
  }
}

module.exports = Item; 