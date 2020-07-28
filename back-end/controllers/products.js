const products = require('../models/products');

exports.listProducts = async (_req, res) => {
  const login = await products.getListProduct();

  res.status(200).json(login);
};
