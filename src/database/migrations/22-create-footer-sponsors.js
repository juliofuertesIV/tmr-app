'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('FooterSponsors', {
      FooterId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Footers', // Referencing the Footers table
          key: 'id',
        },
      },
      SponsorId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Sponsors', // Referencing the Sponsors table
          key: 'id',
        },
      },
      order: {
        type: Sequelize.INTEGER,
        unique: true
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
    await queryInterface.dropTable('FooterSponsors');
  },
};