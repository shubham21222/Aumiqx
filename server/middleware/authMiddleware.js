const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Access Denied' });

  try {
    const verified = jwt.verify(token, 'e4c2f9d6bbfc5db0b4a3ed789ac5f59a4db0ae4b2e7d8b7b69e8a123e64a9d90f0a1d2b4e6c7f8g9h0a1b2c3d4e5f6g7');
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};
