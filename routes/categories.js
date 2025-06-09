const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const db = require('../models/db');
const { ADMIN_PASSWORD } = require('../config');

// GET / - List all categories
router.get('/', async (req, res, next) => {
  try {
    const result = await db.query('SELECT * FROM categories ORDER BY name');
    res.render('index', { 
      categories: result.rows,
      title: 'Tech Gadget Inventory Manager'
    });
  } catch (err) {
    next(err);
  }
});

// GET /category/new - Show form to create new category
router.get('/category/new', (req, res) => {
  res.render('form_category', { 
    category: {}, 
    title: 'Add New Category',
    errors: []
  });
});

// POST /category/new - Create a new category
router.post('/category/new', [
  body('name').notEmpty().withMessage('Name is required'),
  body('description').notEmpty().withMessage('Description is required')
], async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('form_category', { 
        category: req.body, 
        title: 'Add New Category',
        errors: errors.array()
      });
    }

    await db.query(
      'INSERT INTO categories (name, description) VALUES ($1, $2)',
      [req.body.name, req.body.description]
    );
    
    res.redirect('/');
  } catch (err) {
    next(err);
  }
});

// GET /category/:id - View a category and its items
router.get('/category/:id', async (req, res, next) => {
  try {
    const categoryResult = await db.query('SELECT * FROM categories WHERE id = $1', [req.params.id]);
    
    if (categoryResult.rows.length === 0) {
      return res.status(404).render('error', { message: 'Category not found' });
    }
    
    const itemsResult = await db.query('SELECT * FROM items WHERE category_id = $1', [req.params.id]);
    
    res.render('category', { 
      category: categoryResult.rows[0],
      items: itemsResult.rows,
      title: `${categoryResult.rows[0].name} - Tech Gadget Inventory`
    });
  } catch (err) {
    next(err);
  }
});

// GET /category/:id/update - Show form to update a category
router.get('/category/:id/update', async (req, res, next) => {
  try {
    const result = await db.query('SELECT * FROM categories WHERE id = $1', [req.params.id]);
    
    if (result.rows.length === 0) {
      return res.status(404).render('error', { message: 'Category not found' });
    }
    
    res.render('form_category', { 
      category: result.rows[0], 
      title: 'Update Category',
      errors: []
    });
  } catch (err) {
    next(err);
  }
});

// POST /category/:id/update - Update a category
router.post('/category/:id/update', [
  body('name').notEmpty().withMessage('Name is required'),
  body('description').notEmpty().withMessage('Description is required')
], async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('form_category', { 
        category: { ...req.body, id: req.params.id }, 
        title: 'Update Category',
        errors: errors.array()
      });
    }

    await db.query(
      'UPDATE categories SET name = $1, description = $2 WHERE id = $3',
      [req.body.name, req.body.description, req.params.id]
    );
    
    res.redirect('/category/' + req.params.id);
  } catch (err) {
    next(err);
  }
});

// GET /category/:id/delete - Show delete confirmation
router.get('/category/:id/delete', async (req, res, next) => {
  try {
    const result = await db.query('SELECT * FROM categories WHERE id = $1', [req.params.id]);
    
    if (result.rows.length === 0) {
      return res.status(404).render('error', { message: 'Category not found' });
    }
    
    res.render('confirm_delete', { 
      item: result.rows[0],
      type: 'category',
      title: 'Delete Category',
      error: ''
    });
  } catch (err) {
    next(err);
  }
});

// POST /category/:id/delete - Delete a category
router.post('/category/:id/delete', async (req, res, next) => {
  try {
    // Check admin password
    if (req.body.admin_password !== ADMIN_PASSWORD) {
      const result = await db.query('SELECT * FROM categories WHERE id = $1', [req.params.id]);
      return res.render('confirm_delete', { 
        item: result.rows[0],
        type: 'category',
        title: 'Delete Category',
        error: 'Incorrect admin password'
      });
    }

    await db.query('DELETE FROM categories WHERE id = $1', [req.params.id]);
    res.redirect('/');
  } catch (err) {
    next(err);
  }
});

module.exports = router; 