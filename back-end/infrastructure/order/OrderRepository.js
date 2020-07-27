const OrderMapper = require('./OrderMapper');
const { Order } = require('../database/models');

const sequelize = require('../../services/connectionProcedure');
const { isNumber, formatDate } = require('../../services/utils');

class OrderRepository {

  async formatDate(orders) {
    return orders.map(result => ({ ...result, data: formatDate(result.data) }))
      .sort((a, b) => a.status - b.status);
  }

  async getAll() {
    const orders = await sequelize.query('call getAllDataOrder()');

    return this.formatDate(orders);
  }

  async getOrderAdmin(id) {
    if (!isNumber(id)) return false;

    const dataProducts = await sequelize.query(`call getUniqueOrderAdmin("${id}")`);

    if (dataProducts.length === 0) return false;

    const result = await sequelize.query(`call getOrderPriceTotal("${id}")`);

    return { dataProducts, dataPurchase: result };
  }
}

module.exports = OrderRepository;
