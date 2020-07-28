const { connectionPromise } = require('../services/connectionPromise');
const { formatDate, isNumber } = require('../services/utils');
const tokenValid = require('../services/validJWT');

const createProductOrder = async (idOrder, orders) => {
  const resultOrder = await orders.map(({ id, qtd }) => {
    const query = `call createProductOrder("${idOrder.id_order}", "${id}", "${qtd}")`;
    return connectionPromise(query);
  });
  return resultOrder;
};

const createOrder = async (token, address, addressNumber, orders) => {
  const { id_user: idUser } = tokenValid(token);
  const query = `call createOrder("${idUser}", "${address}", "${addressNumber}")`;
  const result = await connectionPromise(query);
  return createProductOrder(result[0], orders);
};

const getListOrderClient = async (token) => {
  const { id_user: idUser } = tokenValid(token);
  const query = `call getAllDataOrderUser(${idUser})`;
  const result = await connectionPromise(query);
  return result.map(({ id_order, data, total }) => ({ id_order, total, date: formatDate(data) }));
};

const getOrderPriceTotal = async (id) => {
  const queryFunction = `SELECT priceOrderTotal("${id}") AS priceTotal, data, id_order FROM orders
  WHERE id_order = ${id}`;
  const { priceTotal, data, id_order } = await connectionPromise(queryFunction);
  return { id_order, priceTotal, date: formatDate(data) };
};

const getOrderClient = async (token, id) => {
  if (!isNumber(id)) return false;

  const { id_user: idUser } = tokenValid(token);
  const query = `call getProductsInOrder("${id}", "${idUser}")`;
  const dataProducts = await connectionPromise(query);

  if (dataProducts.length === 0) return false;
  const result = await getOrderPriceTotal(id);
  return { dataProducts, dataPurchase: result };
};

module.exports = {
  createOrder,
  getListOrderClient,
  getOrderClient,
};
