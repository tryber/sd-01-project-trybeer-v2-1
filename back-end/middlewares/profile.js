const utils = require('../services/utils');

async function updateNameMiddleware(req, res, next) {
  const { name } = req.body;
  if (!utils.isNameValid(name)) return res.status(400).json({ message: 'Invalid name' });

  next();
}

module.exports = { updateNameMiddleware };
