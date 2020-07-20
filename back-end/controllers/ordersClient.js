const orderClient = require('../models/ordersClient');

exports.createOrder = async (req, res) => {
  const token = req.headers.authorization;
  const { address, addressNumber, orders } = req.body;
  const order = await orderClient.createOrder(token, address, addressNumber, orders);
  if (!order) return res.status(400).json({ message: 'Order is failed' });
  await Promise.all(order);
  res.status(200).json({ message: 'Order successfully placed' });
};

exports.getOrdersClient = async (req, res) => {
  const token = req.headers.authorization;
  const order = await orderClient.getListOrderClient(token);

  if (order.length === 0) return res.status(200).json({ message: 'No purchases were made' });

  res.status(200).json(order);
};

exports.getOneOrderClient = async (req, res) => {
  const token = req.headers.authorization;
  const { id } = req.params;
  const order = await orderClient.getOrderClient(token, id);

  if (!order) return res.status(404).json({ message: 'Order not exist' });

  res.status(200).json(order);
};
