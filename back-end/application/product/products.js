const ProductRepository = require('../../infrastructure/product/ProductRepository');

exports.listProducts = async (_req, res) => {
  const listProduct = await new ProductRepository().getAllProducts();

  return res.status(200).json(listProduct);
};
