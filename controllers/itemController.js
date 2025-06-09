const Item = require('../models/item');
const Category = require('../models/category');
const { validationResult } = require('express-validator');

// Display item detail
exports.getItemDetail = async (req, res) => {
  try {
    const item = await Item.getById(req.params.id);
    if (!item) {
      req.flash('error', 'Item not found');
      return res.redirect('/');
    }
    
    res.render('item', {
      title: item.name,
      item,
      messages: req.flash()
    });
  } catch (err) {
    console.error(err);
    req.flash('error', 'Error fetching item details');
    res.redirect('/');
  }
};

// Display item create form
exports.getItemForm = async (req, res) => {
  try {
    const categories = await Category.getAll();
    const item = { 
      id: null, 
      name: '', 
      description: '', 
      price: '', 
      quantity: '', 
      image_url: '',
      category_id: req.query.category_id || ''
    };
    
    res.render('form_item', {
      title: 'Create Item',
      item,
      categories,
      messages: req.flash()
    });
  } catch (err) {
    console.error(err);
    req.flash('error', 'Error loading item form');
    res.redirect('/');
  }
};

// Display item update form
exports.getItemUpdateForm = async (req, res) => {
  try {
    const [item, categories] = await Promise.all([
      Item.getById(req.params.id),
      Category.getAll()
    ]);
    
    if (!item) {
      req.flash('error', 'Item not found');
      return res.redirect('/');
    }
    
    res.render('form_item', {
      title: 'Update Item',
      item,
      categories,
      messages: req.flash()
    });
  } catch (err) {
    console.error(err);
    req.flash('error', 'Error loading item update form');
    res.redirect('/');
  }
};

// Handle item create
exports.createItem = async (req, res) => {
  const errors = validationResult(req);
  
  try {
    const categories = await Category.getAll();
    
    if (!errors.isEmpty()) {
      return res.render('form_item', {
        title: 'Create Item',
        item: req.body,
        categories,
        errors: errors.array(),
        messages: req.flash()
      });
    }
    
    const { name, description, price, quantity, image_url, category_id } = req.body;
    
    const item = await Item.create(
      name,
      description,
      price,
      quantity,
      image_url,
      category_id
    );
    
    req.flash('success', 'Item created successfully');
    res.redirect(`/categories/${item.category_id}`);
  } catch (err) {
    console.error(err);
    req.flash('error', 'Error creating item');
    res.redirect('/');
  }
};

// Handle item update
exports.updateItem = async (req, res) => {
  const errors = validationResult(req);
  
  try {
    const categories = await Category.getAll();
    
    if (!errors.isEmpty()) {
      return res.render('form_item', {
        title: 'Update Item',
        item: { ...req.body, id: req.params.id },
        categories,
        errors: errors.array(),
        messages: req.flash()
      });
    }
    
    const { name, description, price, quantity, image_url, category_id } = req.body;
    
    const item = await Item.update(
      req.params.id,
      name,
      description,
      price,
      quantity,
      image_url,
      category_id
    );
    
    req.flash('success', 'Item updated successfully');
    res.redirect(`/items/${item.id}`);
  } catch (err) {
    console.error(err);
    req.flash('error', 'Error updating item');
    res.redirect('/');
  }
};

// Display item delete confirmation page
exports.getDeleteItem = async (req, res) => {
  try {
    const item = await Item.getById(req.params.id);
    if (!item) {
      req.flash('error', 'Item not found');
      return res.redirect('/');
    }
    
    res.render('confirm_delete', {
      title: 'Delete Item',
      item,
      itemType: 'item',
      messages: req.flash()
    });
  } catch (err) {
    console.error(err);
    req.flash('error', 'Error fetching item');
    res.redirect('/');
  }
};

// Handle item delete
exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.getById(req.params.id);
    
    if (!item) {
      req.flash('error', 'Item not found');
      return res.redirect('/');
    }
    
    if (req.body.password !== process.env.ADMIN_PASSWORD) {
      req.flash('error', 'Incorrect admin password');
      return res.redirect(`/items/${req.params.id}/delete`);
    }
    
    await Item.delete(req.params.id);
    req.flash('success', 'Item deleted successfully');
    res.redirect(`/categories/${item.category_id}`);
  } catch (err) {
    console.error(err);
    req.flash('error', 'Error deleting item');
    res.redirect('/');
  }
}; 