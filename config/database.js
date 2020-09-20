const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'schoolmanagement', 
    'root', 
    'password', 
{ 
    host: '127.0.0.1', 
    dialect: 'mysql', 
    operationAliases: false 
});

module.exports = sequelize;
global.sequelize = sequelize;
