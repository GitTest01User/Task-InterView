const jwt = require('jsonwebtoken');
const { ErrorHandler } = require('../error/errorHandler');

 authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return next(new ErrorHandler('Unauthorized', 401));

  jwt.verify(token, 'secret_key', (err, decoded) => {
    if (err) return next(new ErrorHandler('Invalid Token', 403));
    req.user = decoded;
    next();
  });
};

module.exports = authMiddleware;