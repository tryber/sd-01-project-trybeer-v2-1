const { isAddressValid } = require('../services/utils');

async function validOrderMiddleware(req, res, next) {
  const { address, addressNumber } = req.body;
  
  if (!address.length > 0 || !isAddressValid(addressNumber)) {
    return res.status(400).json({ message: 'Invalid Fields' });
  }

  return next();
}

module.exports = {
  validOrderMiddleware,
};
