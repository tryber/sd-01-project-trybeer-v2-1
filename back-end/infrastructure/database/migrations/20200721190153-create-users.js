'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => (
    queryInterface.createTable('Users', {
      id_user: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    })
  ),

  down: async (queryInterface) => queryInterface.dropTable('Users'),
};
