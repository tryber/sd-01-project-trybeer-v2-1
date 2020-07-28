const Order = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id_order: {
      type: DataTypes.NUMBER,
      primaryKey: true,
    },
    data: DataTypes.DATE,
    address: DataTypes.STRING,
    address_number: DataTypes.NUMBER,
    status: DataTypes.STRING,
  });

  return Order;
};

module.exports = Order;
