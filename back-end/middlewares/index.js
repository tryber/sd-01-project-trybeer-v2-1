const { validLoginMiddleware } = require('./loginValid');
const { validRegisterMiddleware } = require('./register');
const { userValidMiddleware } = require('./userValid');
const { updateNameMiddleware } = require('./profile');
const { validOrderMiddleware, routeParamsValid } = require('./orderValid');

module.exports = {
  validLoginMiddleware,
  validRegisterMiddleware,
  userValidMiddleware,
  updateNameMiddleware,
  validOrderMiddleware,
  routeParamsValid,
};
