const OrderMapper = require('./OrderMapper');
const { Order } = require('../database/models');

const sequelize = require('../../services/connectionProcedure');
const { isNumber } = require('../../services/utils');

class OrderRepository {
  async getAll() {
    const id = await sequelize.query('call getAllDataOrder()');
    const formatedData = id.map(result => ({ ...result, data: formatDate(result.data) }))
      .sort((a, b) => a.status - b.status);
    return formatedData;
  }

  async getOrderPriceTotal(id) {
    return await sequelize.query(`SELECT priceOrderTotal("${id}") AS priceTotal, data, id_order, status FROM Orders
    WHERE id_order = ${id}`);
  }

  async getOrderAdmin(id) {
    if (!isNumber(id)) return false;

    const dataProducts = await sequelize.query(`call getUniqueOrderAdmin("${id}")`);
    if (dataProducts.length === 0) return false;
    const result = await this.getOrderPriceTotal(id);
    return { dataProducts, dataPurchase: result };
  }
}

module.exports = OrderRepository;
