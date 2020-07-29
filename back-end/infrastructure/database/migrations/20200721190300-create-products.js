module.exports = {
  up: async (queryInterface, Sequelize) => (
    queryInterface.createTable('Products', {
      id_product: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name_product: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    })
  ),

  down: async queryInterface => queryInterface.dropTable('Products'),
};
