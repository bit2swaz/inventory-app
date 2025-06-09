// Admin authentication middleware
exports.authenticateAdmin = (req, res, next) => {
  // If there's a session with admin authenticated, allow access
  if (req.session && req.session.isAdmin) {
    return next();
  }
  
  // If password was submitted in the form
  if (req.body && req.body.adminPassword) {
    // Check if the submitted password matches the environment variable
    if (req.body.adminPassword === process.env.ADMIN_PASSWORD) {
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
  return res.redirect(`/admin/auth?redirect=${encodeURIComponent(req.originalUrl)}`);
}; 