const { attributes } = require('structure');

const Order = attributes({
  id_order: Number,
  user_id: {
    type: Number,
    required: true,
  },
  data: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  address_number: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
})(
  class Order {
    dataOrder() {
      return this;
    }
  },
);

module.exports = Order;
