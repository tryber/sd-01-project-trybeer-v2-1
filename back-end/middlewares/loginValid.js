const { isEmailValid, isPasswordValid } = require('../services/utils');

function validLoginMiddleware(req, res, next) {
  const { email, password } = req.body;

  if (!isEmailValid(email) || !isPasswordValid(password)) {
    return res.status(400).json({ message: 'Invalid Fields' });
  }

  return next();
}

module.exports = { validLoginMiddleware };
