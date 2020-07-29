const Order = require('../../domain/order');

const OrderMapper = {
  toEntity({ dataValues }) {
    const { id_order, data, address, address_number, status } = dataValues;
    return new Order({ id_order, data, address, address_number, status });
  },

  toDatabase(survivor) {
    const { status } = survivor;
    return { status };
  },
};

module.exports = OrderMapper;
