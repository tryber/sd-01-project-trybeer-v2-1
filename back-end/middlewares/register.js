const utils = require('../services/utils');
const { getEmail } = require('../models/userRegisterLogin');

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

  if (await getEmail(email)) return res.status(400).json({ message: 'The email already registered' });

  next();
}

module.exports = { validRegisterMiddleware };
