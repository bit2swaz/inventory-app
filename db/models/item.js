const db = require('../index');

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

  // Get a single item by ID
  static async getById(id) {
    const result = await db.query(`
      SELECT i.*, c.name as category_name 
      FROM items i
      JOIN categories c ON i.category_id = c.id
      WHERE i.id = $1
    `, [id]);
    return result.rows[0];
  }

  // Get items by category
  static async getByCategory(categoryId) {
    const result = await db.query(`
      SELECT i.*, c.name as category_name 
      FROM items i
      JOIN categories c ON i.category_id = c.id
      WHERE i.category_id = $1
      ORDER BY i.name
    `, [categoryId]);
    return result.rows;
  }

  // Create a new item
  static async create(name, description, price, categoryId, stock) {
    const result = await db.query(
      'INSERT INTO items (name, description, price, category_id, stock) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, description, price, categoryId, stock]
    );
    return result.rows[0];
  }

  // Update an item
  static async update(id, name, description, price, categoryId, stock) {
    const result = await db.query(
      'UPDATE items SET name = $1, description = $2, price = $3, category_id = $4, stock = $5 WHERE id = $6 RETURNING *',
      [name, description, price, categoryId, stock, id]
    );
    return result.rows[0];
  }

  // Delete an item
  static async delete(id) {
    await db.query('DELETE FROM items WHERE id = $1', [id]);
    return true;
  }

  // Update item stock
  static async updateStock(id, stock) {
    const result = await db.query(
      'UPDATE items SET stock = $1 WHERE id = $2 RETURNING *',
      [stock, id]
    );
    return result.rows[0];
  }
}

module.exports = Item; 