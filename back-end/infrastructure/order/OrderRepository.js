const OrderMapper = require('./OrderMapper');
const { Order } = require('../database/models');

const sequelize = require('../../services/connectionProcedure');
const { formatDate } = require('../../services/utils');

class OrderRepository {

  async _formatDate(orders) {
    return orders.map(result => ({ ...result, data: formatDate(result.data) }))
      .sort((a, b) => a.status - b.status);
  }

  async getAll() {
    const orders = await sequelize.query('call getAllDataOrder()');

    return this._formatDate(orders);
  }

  async getOrderAdmin(id) {
    const dataProducts = await sequelize.query(`call getUniqueOrderAdmin("${id}")`);

    if (dataProducts.length === 0) throw new Error('OrderIsNotFound');

    const result = await sequelize.query(`call getOrderPriceTotal("${id}")`);
    const formatDataOrder = await this._formatDate(result);

    return { dataProducts, dataPurchase: formatDataOrder };
  }

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

  // Client
  async getListOrderClient(token) {
    const { id_user: idUser } = token;
    const query = await sequelize.query(`call getAllDataOrderUser(${idUser})`);
    return query.map(({ id_order, data, total }) => ({ id_order, total, date: formatDate(data) }));
  }

  async getOrderClient(token, id) {
    const { id_user: idUser } = token;
    const dataProducts = await sequelize.query(`call getProductsInOrder("${id}", "${idUser}")`);
    if (dataProducts.length === 0) return false;

    const result = await sequelize.query(`call getOrderPriceTotal("${id}")`);
    const formatDataOrder = await this._formatDate(result);

    return { dataProducts, dataPurchase: formatDataOrder };
  }

  async _createProductOrder(idOrder, orders) {
    const resultOrder = await orders.map(({ id, qtd }) => (
      sequelize.query(`call createProductOrder("${idOrder.id_order}", "${id}", "${qtd}")`)
    ));

    return resultOrder;
  }

  async createOrder(token, address, addressNumber, orders) {
    const { id_user: idUser } = token;
    const result = await sequelize.query(`call createOrder("${idUser}", "${address}", "${addressNumber}")`);
    return this._createProductOrder(result[0], orders);
  }
}

module.exports = OrderRepository;
