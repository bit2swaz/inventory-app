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
router.post('/auth', (req, res) => {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    console.error('ADMIN_PASSWORD not set in environment variables');
    return res.status(500).render('error', {
      message: 'Server configuration error',
      error: { status: 500, stack: 'ADMIN_PASSWORD not configured' }
    });
  }

  if (req.body.adminPassword === adminPassword) {
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
  // Clear admin session
  req.session.isAdmin = false;
  res.redirect('/');
});

module.exports = router; 