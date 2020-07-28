const { errorReadingJWT } = require('../rescue/rescues');
const tokenValid = require('../services/validJWT');

const userValidMiddleware = errorReadingJWT((req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Access denied' });
  const { role } = tokenValid(token);

  const validRole = (req.originalUrl).substring(1, 6);

  if (role === 'client' && validRole === 'admin')
    return res.status(401).json({ message: 'User Unauthorized' });

  if (role === 'admin' && validRole !== 'admin')
    return res.status(401).json({ message: 'User Unauthorized' });
  next();
});

module.exports = {
  userValidMiddleware,
};
