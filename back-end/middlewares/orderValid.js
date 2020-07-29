const { isAddressValid, isNumber } = require('../services/utils');

async function validOrderMiddleware(req, res, next) {
  const { address, addressNumber } = req.body;

  if (!address.length > 0 || !isAddressValid(addressNumber))
    return res.status(400).json({ message: 'Invalid Fields' });

  return next();
}

async function routeParamsValid(req, res, next) {
  const { id } = req.params;
  if (!isNumber(id)) return res.status(404).json({ message: 'Page not Found' });

  return next();
}

module.exports = {
  validOrderMiddleware,
  routeParamsValid,
};
