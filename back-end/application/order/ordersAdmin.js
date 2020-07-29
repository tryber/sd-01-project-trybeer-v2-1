const OrderRepository = require('../../infrastructure/order/OrderRepository');

exports.ordersAdmin = async (_req, res) => {
  const listProduct = await new OrderRepository().getAll();

  return res.status(200).json(listProduct);
};

exports.getOneOrderAdmin = async (req, res) => {
  const { id } = req.params;
  const order = await new OrderRepository().getOrderAdmin(id);

  if (!order) return res.status(404).json({ message: 'Order is not exist' });

  return res.status(200).json(order);
};

exports.putStatusOrderAdmin = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  await new OrderRepository().putStatusOrder({ id, status });

  return res.status(200).json({ message: 'Completed order' });
};
