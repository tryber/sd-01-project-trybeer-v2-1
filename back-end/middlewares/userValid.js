const { errorReadingJWT } = require('./rescues');
const tokenValid = require('../services/validJWT');

const userValidMiddleware = errorReadingJWT((req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'Access denied' });

  const payload = tokenValid(token);
  const validRole = (req.originalUrl).substring(1, 6);

  req.payload = payload;

  if (payload.role === 'client' && validRole === 'admin') return res.status(401).json({ message: 'User Unauthorized' });

  if (payload.role === 'admin' && validRole !== 'admin') return res.status(401).json({ message: 'User Unauthorized' });

  return next();
});

module.exports = {
  userValidMiddleware,
};
