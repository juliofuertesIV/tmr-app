'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ContestMedia', {
      ContestId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Contests', // Referencing the Contests table
          key: 'id'
        },
      },
      MediumId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Media', // Referencing the Media table
          key: 'id'
        },
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

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ContestMedia');
  },
};