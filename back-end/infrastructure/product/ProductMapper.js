const Product = require('../../domain/product');

const ProductMapper = {
  toEntity({ dataValues }) {
    const { id_product, name_product, price, image } = dataValues;
    return new Product({ id_product, name_product, price, image });
  },

  toDatabase(survivor) {
    const { name_product, price, image } = survivor;
    return { name_product, price, image };
  },
};

module.exports = ProductMapper;
