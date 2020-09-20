'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('students', {
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
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('students');
  }
};
