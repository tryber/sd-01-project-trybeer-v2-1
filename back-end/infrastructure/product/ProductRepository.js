const ProductMapper = require('./ProductMapper');

const { Product } = require('../database/models');
class ProductRepository {
  async getAllProducts() {
    const product = await Product.findAll();
    return product.map(ProductMapper.toEntity);
  }
}

module.exports = ProductRepository;
