'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ContestSponsors', {
      ContestId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Contests', // Referencing the Contests table
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      SponsorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Sponsors', // Referencing the Sponsors table
          key: 'id',
        },
        onDelete: 'CASCADE',
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
    await queryInterface.dropTable('ContestSponsors');
  },
};