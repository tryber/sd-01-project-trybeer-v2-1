const Product = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id_product: {
      type: DataTypes.NUMBER,
      primaryKey: true,
    },
    name_product: DataTypes.STRING,
    price: DataTypes.NUMBER,
    image: DataTypes.STRING,
  });

  return Product;
};

module.exports = Product;
