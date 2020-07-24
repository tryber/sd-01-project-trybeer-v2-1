const OrderMapper = require('./OrderMapper');
const { Order } = require('../database/models');

class OrderRepository {
  async getAll() {
    const profile = await Order.findAll();
    return profile.map(OrderMapper.toEntity);
  }
}

module.exports = OrderRepository;
