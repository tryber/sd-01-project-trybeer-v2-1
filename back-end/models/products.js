const { connectionPromise } = require('../services/connectionPromise');

const getListProduct = async () => {
  const query = 'call getListProducts()';
  const data = await connectionPromise(query);
  return data;
};

module.exports = {
  getListProduct,
};
