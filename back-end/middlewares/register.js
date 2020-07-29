const utils = require('../services/utils');

function isRoleValid(role = '') {
  const roleOptions = ['admin', 'client'];

  return roleOptions.includes(role);
}

async function validRegisterMiddleware(req, res, next) {
  const { name, email, password, role } = req.body;
  if (
    !isRoleValid(role)
    || !utils.isEmailValid(email)
    || !utils.isPasswordValid(password)
    || !utils.isNameValid(name)
  ) return res.status(400).json({ message: 'Invalid Fields' });

  next();
}

module.exports = { validRegisterMiddleware };
