const OrderMapper = require('./OrderMapper');
const { Order } = require('../database/models');

const sequelize = require('../../services/connectionProcedure');

class OrderRepository {
  async getAll() {
    const id = await sequelize.query('call getAllDataOrder()');
    const formatedData = id.map(result => ({ ...result, data: formatDate(result.data) }))
      .sort((a, b) => a.status - b.status);
    return formatedData;
  }
}

module.exports = OrderRepository;

