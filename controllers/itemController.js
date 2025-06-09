const Item = require('../db/models/item');

// Get all items
exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.getAll();
    res.render('items', { 
      title: 'Inventory Items', 
      items 
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
      item 
    });
  } catch (error) {
    console.error(`Error fetching item ${req.params.id}:`, error);
    res.status(500).render('error', { 
      message: 'Error fetching item', 
      error 
    });
  }
}; 