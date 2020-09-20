const Sequelize = require('sequelize');
const sequelize = require('../config/database');

module.exports = sequelize.define('Student', {
    
    student_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    student: {
        type: Sequelize.STRING(50),
        unique: true,
        allowNull: false,
    },
    isSuspended: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },

});
