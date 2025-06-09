const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const db = require('../models/db');
const { ADMIN_PASSWORD } = require('../config');

// GET /item/:id - View a single item
router.get('/item/:id', async (req, res, next) => {
  try {
    const result = await db.query(`
      SELECT i.*, c.name as category_name 
      FROM items i 
      JOIN categories c ON i.category_id = c.id 
      WHERE i.id = $1
    `, [req.params.id]);
    
    if (result.rows.length === 0) {
      return res.status(404).render('error', { message: 'Item not found' });
    }
    
    res.render('item', { 
      item: result.rows[0],
      title: result.rows[0].name
    });
  } catch (err) {
    next(err);
  }
});

// GET /item/new - Show form to create new item
router.get('/item/new', async (req, res, next) => {
  try {
    const categories = await db.query('SELECT * FROM categories ORDER BY name');
    
    res.render('form_item', { 
      item: {}, 
      categories: categories.rows,
      title: 'Add New Item',
      errors: []
    });
  } catch (err) {
    next(err);
  }
});

// POST /item/new - Create a new item
router.post('/item/new', [
  body('name').notEmpty().withMessage('Name is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('quantity').isInt({ min: 0 }).withMessage('Quantity must be a positive integer'),
  body('category_id').notEmpty().withMessage('Category is required')
], async (req, res, next) => {
  try {
    const errors = validationResult(req);
    const categories = await db.query('SELECT * FROM categories ORDER BY name');
    
    if (!errors.isEmpty()) {
      return res.render('form_item', { 
        item: req.body, 
        categories: categories.rows,
        title: 'Add New Item',
        errors: errors.array()
      });
    }

    const result = await db.query(
      'INSERT INTO items (name, description, price, quantity, image_url, category_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
      [req.body.name, req.body.description, req.body.price, req.body.quantity, req.body.image_url, req.body.category_id]
    );
    
    res.redirect('/item/' + result.rows[0].id);
  } catch (err) {
    next(err);
  }
});

// GET /item/:id/update - Show form to update an item
router.get('/item/:id/update', async (req, res, next) => {
  try {
    const itemResult = await db.query('SELECT * FROM items WHERE id = $1', [req.params.id]);
    
    if (itemResult.rows.length === 0) {
      return res.status(404).render('error', { message: 'Item not found' });
    }
    
    const categories = await db.query('SELECT * FROM categories ORDER BY name');
    
    res.render('form_item', { 
      item: itemResult.rows[0], 
      categories: categories.rows,
      title: 'Update Item',
      errors: []
    });
  } catch (err) {
    next(err);
  }
});

// POST /item/:id/update - Update an item
router.post('/item/:id/update', [
  body('name').notEmpty().withMessage('Name is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('quantity').isInt({ min: 0 }).withMessage('Quantity must be a positive integer'),
  body('category_id').notEmpty().withMessage('Category is required')
], async (req, res, next) => {
  try {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      const categories = await db.query('SELECT * FROM categories ORDER BY name');
      return res.render('form_item', { 
        item: { ...req.body, id: req.params.id }, 
        categories: categories.rows,
        title: 'Update Item',
        errors: errors.array()
      });
    }

    await db.query(
      'UPDATE items SET name = $1, description = $2, price = $3, quantity = $4, image_url = $5, category_id = $6 WHERE id = $7',
      [req.body.name, req.body.description, req.body.price, req.body.quantity, req.body.image_url, req.body.category_id, req.params.id]
    );
    
    res.redirect('/item/' + req.params.id);
  } catch (err) {
    next(err);
  }
});

// GET /item/:id/delete - Show delete confirmation
router.get('/item/:id/delete', async (req, res, next) => {
  try {
    const result = await db.query(`
      SELECT i.*, c.name as category_name 
      FROM items i 
      JOIN categories c ON i.category_id = c.id 
      WHERE i.id = $1
    `, [req.params.id]);
    
    if (result.rows.length === 0) {
      return res.status(404).render('error', { message: 'Item not found' });
    }
    
    res.render('confirm_delete', { 
      item: result.rows[0],
      type: 'item',
      title: 'Delete Item',
      error: ''
    });
  } catch (err) {
    next(err);
  }
});

// POST /item/:id/delete - Delete an item
router.post('/item/:id/delete', async (req, res, next) => {
  try {
    // Check admin password
    if (req.body.admin_password !== ADMIN_PASSWORD) {
      const result = await db.query(`
        SELECT i.*, c.name as category_name 
        FROM items i 
        JOIN categories c ON i.category_id = c.id 
        WHERE i.id = $1
      `, [req.params.id]);
      
      return res.render('confirm_delete', { 
        item: result.rows[0],
        type: 'item',
        title: 'Delete Item',
        error: 'Incorrect admin password'
      });
    }

    const item = await db.query('SELECT category_id FROM items WHERE id = $1', [req.params.id]);
    const categoryId = item.rows[0].category_id;
    
    await db.query('DELETE FROM items WHERE id = $1', [req.params.id]);
    
    res.redirect('/category/' + categoryId);
  } catch (err) {
    next(err);
  }
});

module.exports = router; 