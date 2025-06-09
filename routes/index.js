const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { 
    title: 'Tech Gadget Inventory',
    message: 'Welcome to Tech Gadget Inventory'
  });
});

module.exports = router; 