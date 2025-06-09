const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const itemController = require('../controllers/itemController');
const { isAdmin } = require('../middleware/auth');

/* GET home page. */
router.get('/', async (req, res) => {
  try {
    const db = require('../db');
    const categories = await db.query('SELECT * FROM categories ORDER BY name');
    
    res.render('index', { 
      title: 'Tech Gadget Inventory',
      message: 'Welcome to Tech Gadget Inventory',
      categories: categories.rows,
      isAdmin: req.session && req.session.isAdmin
    });
  } catch (error) {
    console.error('Error fetching categories for homepage:', error);
    res.render('index', { 
      title: 'Tech Gadget Inventory',
      message: 'Welcome to Tech Gadget Inventory',
      categories: [],
      isAdmin: req.session && req.session.isAdmin
    });
  }
});

/* Categories routes */
// Read operations (public)
router.get('/categories', categoryController.getAllCategories);

// Create operations (admin only) - must come before /:id routes
router.get('/categories/new', isAdmin, categoryController.createCategoryForm);
router.post('/categories', isAdmin, categoryController.createCategory);

// Category detail - must come after /new route
router.get('/categories/:id', categoryController.getCategoryById);

// Update operations (admin only)
router.get('/categories/:id/edit', isAdmin, categoryController.updateCategoryForm);
router.post('/categories/:id/update', isAdmin, categoryController.updateCategory);

// Delete operations (admin only)
router.get('/categories/:id/confirm-delete', isAdmin, categoryController.deleteCategoryForm);
router.post('/categories/:id/delete', isAdmin, categoryController.deleteCategory);

/* Items routes */
// Read operations (public)
router.get('/items', itemController.getAllItems);

// Create operations (admin only) - must come before /:id routes
router.get('/items/new', isAdmin, itemController.createItemForm);
router.post('/items', isAdmin, itemController.createItem);

// Item detail - must come after /new route
router.get('/items/:id', itemController.getItemById);

// Update operations (admin only)
router.get('/items/:id/edit', isAdmin, itemController.updateItemForm);
router.post('/items/:id/update', isAdmin, itemController.updateItem);

// Delete operations (admin only)
router.get('/items/:id/confirm-delete', isAdmin, itemController.deleteItemForm);
router.post('/items/:id/delete', isAdmin, itemController.deleteItem);

module.exports = router; 