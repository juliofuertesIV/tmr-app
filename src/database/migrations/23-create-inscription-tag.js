'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('InscriptionTags', {
      InscriptionId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Inscriptions', // Referencing the Inscriptions table
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      TagId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Tags', // Referencing the Tags table
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
    await queryInterface.dropTable('InscriptionTags');
  },
};