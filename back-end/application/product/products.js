const ProductRepository = require('../../infrastructure/product/ProductRepository');

exports.listProducts = async (_req, res) => {
  const listProduct = await new ProductRepository().getAll();

  return res.status(200).json(listProduct);
};
