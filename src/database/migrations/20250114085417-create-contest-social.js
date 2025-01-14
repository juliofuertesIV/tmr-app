'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ContestSocials', {
      ContestId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Contests', // Referencing the Contests table
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      SocialMediumId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'SocialMedia', // Referencing the SocialMedia table
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
    await queryInterface.dropTable('ContestSocials');
  },
};