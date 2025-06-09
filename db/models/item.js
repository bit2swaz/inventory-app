const db = require('../index');

class Item {
  // Get all items
  static async getAll() {
    try {
      const result = await db.query(`
        SELECT i.*, c.name as category_name 
        FROM items i
        JOIN categories c ON i.category_id = c.id
        ORDER BY i.name
      `);
      return result.rows;
    } catch (error) {
      console.error('Error in Item.getAll:', error);
      throw error;
    }
  }

  // Get a single item by ID
  static async getById(id) {
    try {
      const result = await db.query(`
        SELECT i.*, c.name as category_name 
        FROM items i
        JOIN categories c ON i.category_id = c.id
        WHERE i.id = $1
      `, [id]);
      return result.rows[0];
    } catch (error) {
      console.error(`Error in Item.getById(${id}):`, error);
      throw error;
    }
  }

  // Get items by category
  static async getByCategory(categoryId) {
    try {
      const result = await db.query(`
        SELECT i.*, c.name as category_name 
        FROM items i
        JOIN categories c ON i.category_id = c.id
        WHERE i.category_id = $1
        ORDER BY i.name
      `, [categoryId]);
      return result.rows;
    } catch (error) {
      console.error(`Error in Item.getByCategory(${categoryId}):`, error);
      throw error;
    }
  }

  // Create a new item
  static async create(name, description, price, categoryId, stock) {
    try {
      const result = await db.query(
        'INSERT INTO items (name, description, price, category_id, stock) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [name, description, price, categoryId, stock]
      );
      return result.rows[0];
    } catch (error) {
      console.error(`Error in Item.create(${name}):`, error);
      throw error;
    }
  }

  // Update an item
  static async update(id, name, description, price, categoryId, stock) {
    try {
      const result = await db.query(
        'UPDATE items SET name = $1, description = $2, price = $3, category_id = $4, stock = $5 WHERE id = $6 RETURNING *',
        [name, description, price, categoryId, stock, id]
      );
      
      if (result.rows.length === 0) {
        throw new Error(`Item with id ${id} not found`);
      }
      
      return result.rows[0];
    } catch (error) {
      console.error(`Error in Item.update(${id}):`, error);
      throw error;
    }
  }

  // Delete an item
  static async delete(id) {
    try {
      const result = await db.query('DELETE FROM items WHERE id = $1 RETURNING id', [id]);
      
      if (result.rows.length === 0) {
        throw new Error(`Item with id ${id} not found`);
      }
      
      return true;
    } catch (error) {
      console.error(`Error in Item.delete(${id}):`, error);
      throw error;
    }
  }

  // Update item stock
  static async updateStock(id, stock) {
    try {
      const result = await db.query(
        'UPDATE items SET stock = $1 WHERE id = $2 RETURNING *',
        [stock, id]
      );
      
      if (result.rows.length === 0) {
        throw new Error(`Item with id ${id} not found`);
      }
      
      return result.rows[0];
    } catch (error) {
      console.error(`Error in Item.updateStock(${id}, ${stock}):`, error);
      throw error;
    }
  }
}

module.exports = Item; 