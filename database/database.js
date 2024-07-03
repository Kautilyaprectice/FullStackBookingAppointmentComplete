const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('book', 'root', 'Kautilya@1', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;