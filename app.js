const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const ejsLayouts = require('express-ejs-layouts');
const session = require('express-session');
const flash = require('connect-flash');
require('dotenv').config();

// Import routes
const categoryRoutes = require('./routes/categoryRoutes');
const itemRoutes = require('./routes/itemRoutes');

// Initialize app
const app = express();
const PORT = process.env.PORT || 3000;

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.set('layout', 'layout');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Session and flash setup
app.use(session({
  secret: process.env.SESSION_SECRET || 'tech-gadget-inventory-secret',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 * 15 } // 15 minutes
}));
app.use(flash());

// Routes
app.use('/', categoryRoutes);
app.use('/', itemRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).render('404', { 
    title: 'Page Not Found',
    messages: req.flash()
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { 
    title: 'Error',
    error: err,
    messages: req.flash()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to view the application`);
}); 