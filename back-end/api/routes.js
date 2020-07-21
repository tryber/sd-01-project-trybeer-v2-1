const { login, register } = require('../application/user/registerLogin');
const { profileClient } = require('../application/user/profileClient');
const { listProducts } = require('../application/products/products');
const { adminProfile } = require('../application/user/profileAdmin');
const { ordersAdmin, getOneOrderAdmin, putStatusOrderAdmin } = require('../application/orders/ordersAdmin');
const { createOrder, getOrdersClient, getOneOrderClient } = require('../application/orders/ordersClient');

module.exports = {
  register,
  login,
  profileClient,
  listProducts,
  adminProfile,
  createOrder,
  getOrdersClient,
  ordersAdmin,
  getOneOrderClient,
  getOneOrderAdmin,
  putStatusOrderAdmin,
};
