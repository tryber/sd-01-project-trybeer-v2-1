'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => (
    queryInterface.createTable('Orders_products', {
      id_order: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Orders',
          key: 'id_order',
        },
      },
      id_product: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Products',
          key: 'id_product',
        },
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    })
  ),

  down: async (queryInterface) => queryInterface.dropTable('Orders_products'),
};
