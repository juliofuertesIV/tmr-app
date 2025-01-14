'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Brands', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      website: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      backgroundColor: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '#e9e9e9',
      },
      foregroundColor: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '#121212',
      },
      accentColor: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'crimson',
      },
      instagramProfile: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tiktokProfile: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Brands');
  },
};
