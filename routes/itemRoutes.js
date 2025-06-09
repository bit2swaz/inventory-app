const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const itemController = require('../controllers/itemController');

// Validation middleware
const itemValidation = [
  body('name')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Item name is required')
    .isLength({ max: 100 })
    .withMessage('Item name cannot exceed 100 characters'),
  body('description')
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description cannot exceed 1000 characters'),
  body('price')
    .trim()
    .isNumeric()
    .withMessage('Price must be a number')
    .isFloat({ min: 0 })
    .withMessage('Price cannot be negative'),
  body('quantity')
    .trim()
    .isInt({ min: 0 })
    .withMessage('Quantity must be a non-negative integer'),
  body('image_url')
    .trim()
    .isURL()
    .withMessage('Image URL must be a valid URL')
    .optional({ checkFalsy: true }),
  body('category_id')
    .trim()
    .isInt()
    .withMessage('Category is required')
];

// GET item create form
router.get('/items/create', itemController.getItemForm);

// POST create item
router.post('/items/create', itemValidation, itemController.createItem);

// GET item detail
router.get('/items/:id', itemController.getItemDetail);

// GET item update form
router.get('/items/:id/update', itemController.getItemUpdateForm);

// POST update item
router.post('/items/:id/update', itemValidation, itemController.updateItem);

// GET item delete confirmation
router.get('/items/:id/delete', itemController.getDeleteItem);

// POST delete item
router.post('/items/:id/delete', itemController.deleteItem);

module.exports = router; 