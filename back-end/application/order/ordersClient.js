const OrderRepository = require('../../infrastructure/order/OrderRepository');

exports.createOrder = async (req, res) => {
  const token = req.headers.authorization;
  const { address, addressNumber, orders } = req.body;
  const order = await new OrderRepository().createOrder(token, address, addressNumber, orders);
  if (!order) return res.status(400).json({ message: 'Order is failed' });
  await Promise.all(order);
  return res.status(200).json({ message: 'Order successfully placed' });
};

exports.getOrdersClient = async (req, res) => {
  const token = req.headers.authorization;
  const order = await new OrderRepository().getListOrderClient(token);

  if (order.length === 0) return res.status(200).json({ message: 'No purchases were made' });

  return res.status(200).json(order);
};

exports.getOneOrderClient = async (req, res) => {
  const token = req.headers.authorization;
  const { id } = req.params;
  const order = await new OrderRepository().getOrderClient(token, id);

  if (!order) return res.status(404).json({ message: 'Order not exist' });

  return res.status(200).json(order);
};
