const Category = require('../db/models/category');
const Item = require('../db/models/item');

// Get all categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.getAll();
    res.render('categories', { 
      title: 'Categories', 
      categories 
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
      items 
    });
  } catch (error) {
    console.error(`Error fetching category ${req.params.id}:`, error);
    res.status(500).render('error', { 
      message: 'Error fetching category', 
      error 
    });
  }
}; 