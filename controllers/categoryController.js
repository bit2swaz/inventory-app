const Category = require('../models/category');
const Item = require('../models/item');
const { validationResult } = require('express-validator');

// Display list of all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.getAll();
    res.render('index', { 
      title: 'Tech Gadget Inventory Manager', 
      categories,
      messages: req.flash()
    });
  } catch (err) {
    console.error(err);
    req.flash('error', 'Error fetching categories');
    res.redirect('/');
  }
};

// Display category create form
exports.getCategoryForm = async (req, res) => {
  const category = { id: null, name: '', description: '' };
  res.render('form_category', { 
    title: 'Create Category', 
    category,
    messages: req.flash()
  });
};

// Display category update form
exports.getCategoryUpdateForm = async (req, res) => {
  try {
    const category = await Category.getById(req.params.id);
    if (!category) {
      req.flash('error', 'Category not found');
      return res.redirect('/');
    }
    res.render('form_category', { 
      title: 'Update Category', 
      category,
      messages: req.flash()
    });
  } catch (err) {
    console.error(err);
    req.flash('error', 'Error fetching category');
    res.redirect('/');
  }
};

// Handle category create
exports.createCategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('form_category', {
      title: 'Create Category',
      category: req.body,
      errors: errors.array(),
      messages: req.flash()
    });
  }

  try {
    await Category.create(req.body.name, req.body.description);
    req.flash('success', 'Category created successfully');
    res.redirect('/');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Error creating category');
    res.render('form_category', {
      title: 'Create Category',
      category: req.body,
      messages: req.flash()
    });
  }
};

// Handle category update
exports.updateCategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('form_category', {
      title: 'Update Category',
      category: { ...req.body, id: req.params.id },
      errors: errors.array(),
      messages: req.flash()
    });
  }

  try {
    await Category.update(req.params.id, req.body.name, req.body.description);
    req.flash('success', 'Category updated successfully');
    res.redirect('/');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Error updating category');
    res.render('form_category', {
      title: 'Update Category',
      category: { ...req.body, id: req.params.id },
      messages: req.flash()
    });
  }
};

// Display category delete confirmation page
exports.getDeleteCategory = async (req, res) => {
  try {
    const category = await Category.getById(req.params.id);
    if (!category) {
      req.flash('error', 'Category not found');
      return res.redirect('/');
    }
    
    const hasItems = await Category.hasItems(req.params.id);
    
    res.render('confirm_delete', {
      title: 'Delete Category',
      item: category,
      itemType: 'category',
      hasItems,
      messages: req.flash()
    });
  } catch (err) {
    console.error(err);
    req.flash('error', 'Error fetching category');
    res.redirect('/');
  }
};

// Handle category delete
exports.deleteCategory = async (req, res) => {
  try {
    if (req.body.password !== process.env.ADMIN_PASSWORD) {
      req.flash('error', 'Incorrect admin password');
      return res.redirect(`/categories/${req.params.id}/delete`);
    }
    
    await Category.delete(req.params.id);
    req.flash('success', 'Category deleted successfully');
    res.redirect('/');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Error deleting category');
    res.redirect('/');
  }
};

// Display specific category with its items
exports.getCategoryDetail = async (req, res) => {
  try {
    const category = await Category.getById(req.params.id);
    if (!category) {
      req.flash('error', 'Category not found');
      return res.redirect('/');
    }
    
    const items = await Item.getByCategoryId(req.params.id);
    
    res.render('category', {
      title: category.name,
      category,
      items,
      messages: req.flash()
    });
  } catch (err) {
    console.error(err);
    req.flash('error', 'Error fetching category details');
    res.redirect('/');
  }
}; 