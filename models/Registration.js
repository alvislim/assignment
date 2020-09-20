const Sequelize = require('sequelize');
const sequelize = require('../config/database');

module.exports = sequelize.define('Registration', {   
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },

    teacher_id: {
        type: Sequelize.STRING(50),
        unique: true,
        allowNull: false
    },
    student_id: {
        type: Sequelize.STRING(1000),
        allowNull: false,
    } 
});
