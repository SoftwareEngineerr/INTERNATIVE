const authorize = (roles) => async (req, res, next) => {
    try {
      const roleName = req.user[0].role; // Assuming you have a user object with a 'role' property
  
      // Check if the user's role is in the specified roles array
      if (!roles.includes(roleName)) {
        return res.status(403).json({ error: 'Access denied' });
      }
      next();
    } catch (err) {
      console.error('Error authorizing user:', err);
      res.status(500).json({ error: 'Error authorizing user' });
    }
  };
  
  module.exports = authorize;