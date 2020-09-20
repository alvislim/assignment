const Sequelize = require('sequelize');
const sequelize = require('../config/database');

module.exports = sequelize.define('Teacher', {
    
    teacher_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },

    teacher: {
        type: Sequelize.STRING(50),
        unique: true,
        allowNull: false
    },
});








