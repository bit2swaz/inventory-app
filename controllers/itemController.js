const Item = require('../db/models/item');
const Category = require('../db/models/category');
const { isAdmin } = require('../middleware/auth');

// Get all items
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.getAll();
    res.render('items', { 
      title: 'Inventory Items', 
      items,
      isAdmin: req.session && req.session.isAdmin
    });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).render('error', { 
      message: 'Error fetching items', 
      error 
    });
  }
};

// Get item by ID
exports.getItemById = async (req, res) => {
  try {
    const itemId = req.params.id;
    const item = await Item.getById(itemId);
    
    if (!item) {
      return res.status(404).render('error', { 
        message: 'Item not found', 
        error: { status: 404 } 
      });
    }
    
    res.render('item', { 
      title: item.name, 
      item,
      isAdmin: req.session && req.session.isAdmin
    });
  } catch (error) {
    console.error(`Error fetching item ${req.params.id}:`, error);
    res.status(500).render('error', { 
      message: 'Error fetching item', 
      error 
    });
  }
};

// Display item create form
exports.createItemForm = async (req, res) => {
  try {
    // Get all categories for the dropdown
    const categories = await Category.getAll();
    
    res.render('item-form', {
      title: 'Create New Item',
      item: null,
      categories,
      action: '/items'
    });
  } catch (error) {
    console.error('Error loading create item form:', error);
    res.status(500).render('error', {
      message: 'Error loading create item form',
      error
    });
  }
};

// Handle item create
exports.createItem = async (req, res) => {
  try {
    const { name, description, price, category_id, stock } = req.body;
    
    // Create new item
    const newItem = await Item.create(
      name, 
      description, 
      parseFloat(price), 
      parseInt(category_id), 
      parseInt(stock || 0)
    );
    
    // Redirect to the new item page
    res.redirect(`/items/${newItem.id}`);
  } catch (error) {
    console.error('Error creating item:', error);
    
    // Get categories for form dropdown
    const categories = await Category.getAll();
    
    res.render('item-form', {
      title: 'Create New Item',
      item: req.body,
      categories,
      action: '/items',
      error: 'Error creating item. Please try again.'
    });
  }
};

// Display item edit form
exports.updateItemForm = async (req, res) => {
  try {
    const itemId = req.params.id;
    const item = await Item.getById(itemId);
    
    if (!item) {
      return res.status(404).render('error', {
        message: 'Item not found',
        error: { status: 404 }
      });
    }
    
    // Get all categories for the dropdown
    const categories = await Category.getAll();
    
    res.render('item-form', {
      title: `Edit Item: ${item.name}`,
      item,
      categories,
      action: `/items/${itemId}/update`
    });
  } catch (error) {
    console.error(`Error fetching item for edit ${req.params.id}:`, error);
    res.status(500).render('error', {
      message: 'Error fetching item for edit',
      error
    });
  }
};

// Handle item update
exports.updateItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const { name, description, price, category_id, stock } = req.body;
    
    // Update the item
    const updatedItem = await Item.update(
      itemId,
      name, 
      description, 
      parseFloat(price), 
      parseInt(category_id), 
      parseInt(stock || 0)
    );
    
    // Redirect to the updated item page
    res.redirect(`/items/${updatedItem.id}`);
  } catch (error) {
    console.error(`Error updating item ${req.params.id}:`, error);
    
    // Get categories for form dropdown
    const categories = await Category.getAll();
    
    res.render('item-form', {
      title: 'Edit Item',
      item: { ...req.body, id: req.params.id },
      categories,
      action: `/items/${req.params.id}/update`,
      error: 'Error updating item. Please try again.'
    });
  }
};

// Display item delete confirmation
exports.deleteItemForm = async (req, res) => {
  try {
    const itemId = req.params.id;
    const item = await Item.getById(itemId);
    
    if (!item) {
      return res.status(404).render('error', {
        message: 'Item not found',
        error: { status: 404 }
      });
    }
    
    res.render('delete-confirm', {
      itemName: `item "${item.name}"`,
      warning: null,
      deleteUrl: `/items/${itemId}/delete`,
      cancelUrl: `/items/${itemId}`
    });
  } catch (error) {
    console.error(`Error preparing to delete item ${req.params.id}:`, error);
    res.status(500).render('error', {
      message: 'Error preparing to delete item',
      error
    });
  }
};

// Handle item delete
exports.deleteItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    
    // Get the item to get its category_id for redirect
    const item = await Item.getById(itemId);
    const categoryId = item.category_id;
    
    // Delete the item
    await Item.delete(itemId);
    
    // Redirect to the category page
    res.redirect(`/categories/${categoryId}`);
  } catch (error) {
    console.error(`Error deleting item ${req.params.id}:`, error);
    res.status(500).render('error', {
      message: 'Error deleting item',
      error
    });
  }
}; 