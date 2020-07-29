const Sequelize = require('sequelize');
const path = require('path');

const enviromentVariable = path.resolve(__dirname, '..', '..', '.env');
require('dotenv').config({ path: enviromentVariable });

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

module.exports = sequelize;
