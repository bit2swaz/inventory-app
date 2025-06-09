const express = require('express');
const router = express.Router();
const { authenticateAdmin } = require('../middleware/auth');

// GET admin authentication page
router.get('/auth', (req, res) => {
  const redirectUrl = req.query.redirect || '/';
  res.render('admin-auth', {
    title: 'Admin Authentication',
    message: 'Please enter the admin password',
    originalUrl: redirectUrl
  });
});

// POST admin authentication
router.post('/auth', (req, res, next) => {
  if (req.body.adminPassword === process.env.ADMIN_PASSWORD) {
    // Set admin session
    req.session.isAdmin = true;
    
    // Redirect to the original URL or home
    const redirectUrl = req.body.originalUrl || '/';
    res.redirect(redirectUrl);
  } else {
    // Failed authentication
    res.render('admin-auth', {
      title: 'Admin Authentication',
      message: 'Incorrect password. Please try again.',
      originalUrl: req.body.originalUrl || '/'
    });
  }
});

// Logout route
router.get('/logout', (req, res) => {
  req.session.isAdmin = false;
  res.redirect('/');
});

module.exports = router; 