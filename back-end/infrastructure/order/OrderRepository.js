const OrderMapper = require('./OrderMapper');
const { Order } = require('../database/models');

const sequelize = require('../../services/connectionProcedure');

class OrderRepository {
  async getAll() {
    const id = await sequelize.query('call getAllDataOrder()');
    return id;
  }
}

module.exports = OrderRepository;

