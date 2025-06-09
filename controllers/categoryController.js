const Category = require('../db/models/category');
const Item = require('../db/models/item');
const { isAdmin } = require('../middleware/auth');

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.getAll();
    res.render('categories', { 
      title: 'Categories', 
      categories,
      isAdmin: req.session && req.session.isAdmin
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).render('error', { 
      message: 'Error fetching categories', 
      error 
    });
  }
};

// Get category by ID with its items
exports.getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.getById(categoryId);
    
    if (!category) {
      return res.status(404).render('error', { 
        message: 'Category not found', 
        error: { status: 404 } 
      });
    }
    
    const items = await Item.getByCategory(categoryId);
    
    res.render('category', { 
      title: category.name, 
      category, 
      items,
      isAdmin: req.session && req.session.isAdmin
    });
  } catch (error) {
    console.error(`Error fetching category ${req.params.id}:`, error);
    res.status(500).render('error', { 
      message: 'Error fetching category', 
      error 
    });
  }
};

// Display category create form
exports.createCategoryForm = (req, res) => {
  res.render('category-form', {
    title: 'Create New Category',
    category: null,
    action: '/categories'
  });
};

// Handle category create
exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    
    // Create new category
    const newCategory = await Category.create(name, description);
    
    // Redirect to the new category page
    res.redirect(`/categories/${newCategory.id}`);
  } catch (error) {
    console.error('Error creating category:', error);
    res.render('category-form', {
      title: 'Create New Category',
      category: req.body,
      action: '/categories',
      error: 'Error creating category. Please try again.'
    });
  }
};

// Display category edit form
exports.updateCategoryForm = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.getById(categoryId);
    
    if (!category) {
      return res.status(404).render('error', {
        message: 'Category not found',
        error: { status: 404 }
      });
    }
    
    res.render('category-form', {
      title: `Edit Category: ${category.name}`,
      category,
      action: `/categories/${categoryId}/update`
    });
  } catch (error) {
    console.error(`Error fetching category for edit ${req.params.id}:`, error);
    res.status(500).render('error', {
      message: 'Error fetching category for edit',
      error
    });
  }
};

// Handle category update
exports.updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { name, description } = req.body;
    
    // Update the category
    const updatedCategory = await Category.update(categoryId, name, description);
    
    // Redirect to the updated category page
    res.redirect(`/categories/${updatedCategory.id}`);
  } catch (error) {
    console.error(`Error updating category ${req.params.id}:`, error);
    res.render('category-form', {
      title: 'Edit Category',
      category: { ...req.body, id: req.params.id },
      action: `/categories/${req.params.id}/update`,
      error: 'Error updating category. Please try again.'
    });
  }
};

// Display category delete confirmation
exports.deleteCategoryForm = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.getById(categoryId);
    
    if (!category) {
      return res.status(404).render('error', {
        message: 'Category not found',
        error: { status: 404 }
      });
    }
    
    // Check if there are items in this category
    const items = await Item.getByCategory(categoryId);
    let warning = null;
    
    if (items.length > 0) {
      warning = `This category contains ${items.length} items. Deleting it will also delete all associated items.`;
    }
    
    res.render('delete-confirm', {
      itemName: `category "${category.name}"`,
      warning,
      deleteUrl: `/categories/${categoryId}/delete`,
      cancelUrl: `/categories/${categoryId}`
    });
  } catch (error) {
    console.error(`Error preparing to delete category ${req.params.id}:`, error);
    res.status(500).render('error', {
      message: 'Error preparing to delete category',
      error
    });
  }
};

// Handle category delete
exports.deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    
    // Get items in this category for deletion
    const items = await Item.getByCategory(categoryId);
    
    // Delete all items in this category
    for (const item of items) {
      await Item.delete(item.id);
    }
    
    // Delete the category
    await Category.delete(categoryId);
    
    // Redirect to categories list
    res.redirect('/categories');
  } catch (error) {
    console.error(`Error deleting category ${req.params.id}:`, error);
    res.status(500).render('error', {
      message: 'Error deleting category',
      error
    });
  }
}; 