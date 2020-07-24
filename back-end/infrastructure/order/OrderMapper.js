const Order = require('../../domain/order');

const OrderMapper = {
  toEntity({ dataValues }) {
    const { id_user, name, email, role } = dataValues;
    return new Order({ id_user, name, email, role });
  },

  toDatabase(survivor) {
    const { name, password, email, role } = survivor;
    return { name, password, email, role };
  },
};

module.exports = OrderMapper;
