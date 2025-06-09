const db = require('../index');

class Category {
  // Get all categories
  static async getAll() {
    try {
      const result = await db.query('SELECT * FROM categories ORDER BY name');
      return result.rows;
    } catch (error) {
      console.error('Error in Category.getAll:', error);
      throw error;
    }
  }

  // Get a single category by ID
  static async getById(id) {
    try {
      const result = await db.query('SELECT * FROM categories WHERE id = $1', [id]);
      return result.rows[0];
    } catch (error) {
      console.error(`Error in Category.getById(${id}):`, error);
      throw error;
    }
  }

  // Create a new category
  static async create(name, description) {
    try {
      const result = await db.query(
        'INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *',
        [name, description]
      );
      return result.rows[0];
    } catch (error) {
      console.error(`Error in Category.create(${name}):`, error);
      throw error;
    }
  }

  // Update a category
  static async update(id, name, description) {
    try {
      const result = await db.query(
        'UPDATE categories SET name = $1, description = $2 WHERE id = $3 RETURNING *',
        [name, description, id]
      );
      
      if (result.rows.length === 0) {
        throw new Error(`Category with id ${id} not found`);
      }
      
      return result.rows[0];
    } catch (error) {
      console.error(`Error in Category.update(${id}):`, error);
      throw error;
    }
  }

  // Delete a category
  static async delete(id) {
    try {
      const result = await db.query('DELETE FROM categories WHERE id = $1 RETURNING id', [id]);
      
      if (result.rows.length === 0) {
        throw new Error(`Category with id ${id} not found`);
      }
      
      return true;
    } catch (error) {
      console.error(`Error in Category.delete(${id}):`, error);
      throw error;
    }
  }
}

module.exports = Category; 