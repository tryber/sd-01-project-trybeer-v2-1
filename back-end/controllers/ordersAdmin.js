const { getAllDataOrder, getOrderAdmin, putStatusOrder } = require('../models/ordersAdmin');

exports.ordersAdmin = async (_req, res) => {
  const orders = await getAllDataOrder();
  return res.status(200).json(orders);
};

exports.getOneOrderAdmin = async (req, res) => {
  const { id } = req.params;
  const order = await getOrderAdmin(id);

  if (!order) return res.status(404).json({ message: 'Order is not exist' });

  return res.status(200).json(order);
};

exports.putStatusOrderAdmin = async (req, res) => {
  const { id } = req.params;
  await putStatusOrder(id);

  return res.status(200).json({ message: 'Completed order' });
};
