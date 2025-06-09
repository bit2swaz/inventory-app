const express = require('express');
const path = require('path');
const session = require('express-session');
require('dotenv').config();

const app = express();

// Set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'tech-inventory-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Pass session info to views
app.use((req, res, next) => {
  res.locals.isAdmin = req.session && req.session.isAdmin || false;
  next();
});

// Routes
const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');
app.use('/', indexRouter);
app.use('/admin', adminRouter);

// 404 handler
app.use((req, res, next) => {
  res.status(404).render('error', {
    message: 'Page Not Found',
    error: { status: 404, stack: process.env.NODE_ENV === 'development' ? `The requested URL ${req.url} was not found on this server.` : '' }
  });
});

// Error handler
app.use((err, req, res, next) => {
  // Set locals, only providing error in development
  const status = err.status || 500;
  const errorDetails = {
    message: err.message,
    status: status,
    stack: process.env.NODE_ENV === 'development' ? err.stack : ''
  };
  
  console.error('Error:', err);
  
  res.status(status);
  res.render('error', {
    message: 'An error occurred',
    error: errorDetails
  });
});

module.exports = app; 