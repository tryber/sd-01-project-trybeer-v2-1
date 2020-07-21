const { login, register } = require('../application/user/registerLogin');
const { profileClient } = require('../application/user/profileClient');
const { listProducts } = require('../application/product/products');
const { adminProfile } = require('../application/user/profileAdmin');
const { ordersAdmin, getOneOrderAdmin, putStatusOrderAdmin } = require('../application/order/ordersAdmin');
const { createOrder, getOrdersClient, getOneOrderClient } = require('../application/order/ordersClient');

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
