const ProductRepository = require('../../infrastructure/product/ProductRepository');

exports.listProducts = async (_req, res) => {
  const product = new ProductRepository;
  const listProduct = await product.getAll();

  return res.status(200).json(listProduct);
};
