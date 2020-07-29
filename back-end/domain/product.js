const { attributes } = require('structure');

const Product = attributes({
  id_product: Number,
  name_product: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
})(
  class Product {
    dataProduct() {
      return this;
    }
  },
);

module.exports = Product;
