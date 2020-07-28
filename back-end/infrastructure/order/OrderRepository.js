const OrderMapper = require('./OrderMapper');
const { Order } = require('../database/models');

const sequelize = require('../../services/connectionProcedure');
const { formatDate } = require('../../services/utils');

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
    const dataProducts = await sequelize.query(`call getUniqueOrderAdmin("${id}")`);

    if (dataProducts.length === 0) throw new Error('OrderIsNotFound');

    const result = await sequelize.query(`call getOrderPriceTotal("${id}")`);
    const formatDataOrder = await this.formatDate(result);

    return { dataProducts, dataPurchase: formatDataOrder };
  }

  // async updateStatus(id, status) {
  //   let newStatus = 0;

  //   if (status === newStatus) newStatus = 1;
  //   return await sequelize.query(`call updateStatusOrder("${id}", "${status}")`);
  // }

  // async putStatusOrder(id) {
  //   const query = await sequelize.query(`SELECT status FROM Orders WHERE id_order = ${id}`);
  //   const { status } = query[0][0];

  //   return this.updateStatus(id, status);
  // }

  async _updateStatus(statusOrder) {
    const { id, status } = statusOrder;

    const updateStatus = await Order.update(
      OrderMapper.toDatabase({ status }),
      { where: { id_order: id } },
    );

    if (updateStatus[0] === 0) throw new Error('StatusUpdateIsNotValid');
    return updateStatus;
  }

  async putStatusOrder(statusOrder) {
    const updatePost = await this._updateStatus(statusOrder);

    return updatePost;
  }
}

module.exports = OrderRepository;
