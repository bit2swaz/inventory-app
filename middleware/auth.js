// Admin authentication middleware
exports.authenticateAdmin = (req, res, next) => {
  // If there's a session with admin authenticated, allow access
  if (req.session && req.session.isAdmin) {
    return next();
  }
  
  // If password was submitted in the form
  if (req.body && req.body.adminPassword) {
    const adminPassword = process.env.ADMIN_PASSWORD;
    
    if (!adminPassword) {
      console.error('ADMIN_PASSWORD not set in environment variables');
      return res.status(500).render('error', {
        message: 'Server configuration error',
        error: { status: 500, stack: 'ADMIN_PASSWORD not configured' }
      });
    }
    
    // Check if the submitted password matches the environment variable
    if (req.body.adminPassword === adminPassword) {
      // Set session admin status
      req.session.isAdmin = true;
      return next();
    } else {
      // Incorrect password
      return res.render('admin-auth', {
        title: 'Admin Authentication',
        message: 'Incorrect password. Please try again.',
        originalUrl: req.originalUrl
      });
    }
  }
  
  // No password submitted, show the authentication form
  return res.render('admin-auth', {
    title: 'Admin Authentication',
    message: 'Admin password required',
    originalUrl: req.originalUrl
  });
};

// Check if admin is authenticated
exports.isAdmin = (req, res, next) => {
  if (req.session && req.session.isAdmin) {
    return next();
  }
  
  // Save the requested URL so we can redirect back after authentication
  const redirectPath = encodeURIComponent(req.originalUrl);
  return res.redirect(`/admin/auth?redirect=${redirectPath}`);
}; 