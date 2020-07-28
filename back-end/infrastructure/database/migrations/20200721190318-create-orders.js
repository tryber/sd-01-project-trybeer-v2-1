'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => (
    queryInterface.createTable('Orders', {
      id_order: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_user: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id_user',
        },
      },
      data: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address_number: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "Pendente"
      },
    })
  ),

  down: async (queryInterface) => queryInterface.dropTable('Orders'),
};
