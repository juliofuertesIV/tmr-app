'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Footers', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
    },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Footers');
  },
};