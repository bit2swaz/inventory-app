const db = require('../index');

class Category {
  // Get all categories
  static async getAll() {
    const result = await db.query('SELECT * FROM categories ORDER BY name');
    return result.rows;
  }

  // Get a single category by ID
  static async getById(id) {
    const result = await db.query('SELECT * FROM categories WHERE id = $1', [id]);
    return result.rows[0];
  }

  // Create a new category
  static async create(name, description) {
    const result = await db.query(
      'INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *',
      [name, description]
    );
    return result.rows[0];
  }

  // Update a category
  static async update(id, name, description) {
    const result = await db.query(
      'UPDATE categories SET name = $1, description = $2 WHERE id = $3 RETURNING *',
      [name, description, id]
    );
    return result.rows[0];
  }

  // Delete a category
  static async delete(id) {
    await db.query('DELETE FROM categories WHERE id = $1', [id]);
    return true;
  }
}

module.exports = Category; 