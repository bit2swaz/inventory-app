const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const categoryController = require('../controllers/categoryController');

// Validation middleware
const categoryValidation = [
  body('name')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Category name is required')
    .isLength({ max: 100 })
    .withMessage('Category name cannot exceed 100 characters'),
  body('description')
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters')
];

// GET home page (list of categories)
router.get('/', categoryController.getAllCategories);

// GET category create form
router.get('/categories/create', categoryController.getCategoryForm);

// POST create category
router.post('/categories/create', categoryValidation, categoryController.createCategory);

// GET category update form
router.get('/categories/:id/update', categoryController.getCategoryUpdateForm);

// POST update category
router.post('/categories/:id/update', categoryValidation, categoryController.updateCategory);

// GET category delete confirmation
router.get('/categories/:id/delete', categoryController.getDeleteCategory);

// POST delete category
router.post('/categories/:id/delete', categoryController.deleteCategory);

// GET category detail with items
router.get('/categories/:id', categoryController.getCategoryDetail);

module.exports = router; 