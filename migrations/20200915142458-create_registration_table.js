'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('registrations', {
      id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },

    teacher_id: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    student_id: {
        type: Sequelize.STRING(50),
        allowNull: false,
    }, 
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('registrations');
  }
};
