const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const itemController = require('../controllers/itemController');

/* GET home page. */
router.get('/', async (req, res) => {
  try {
    const db = require('../db');
    const categories = await db.query('SELECT * FROM categories ORDER BY name');
    
    res.render('index', { 
      title: 'Tech Gadget Inventory',
      message: 'Welcome to Tech Gadget Inventory',
      categories: categories.rows
    });
  } catch (error) {
    console.error('Error fetching categories for homepage:', error);
    res.render('index', { 
      title: 'Tech Gadget Inventory',
      message: 'Welcome to Tech Gadget Inventory',
      categories: []
    });
  }
});

/* Categories routes */
router.get('/categories', categoryController.getAllCategories);
router.get('/categories/:id', categoryController.getCategoryById);

/* Items routes */
router.get('/items', itemController.getAllItems);
router.get('/items/:id', itemController.getItemById);

module.exports = router; 