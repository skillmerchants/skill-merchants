// lib/verifyAdmin.js

import jwt from 'jsonwebtoken';

export default function verifyAdmin(req, res, next) {
  
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

  if (!token) {
    console.log('No token provided');
    return new Error('No token provided');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.isAdmin) {
      console.log('Access denied. Admins only.');
      return next(new Error('Access denied. Admins only.'));
    }

    req.user = decoded;
    next();
  } catch (error) {
    next(error);
  }
}
