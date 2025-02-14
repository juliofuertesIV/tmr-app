'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Inscriptions', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING,
      },
      video: {
        type: Sequelize.STRING,
      },
      instagram: {
        type: Sequelize.STRING,
      },
      spotify: {
        type: Sequelize.STRING,
      },
      tiktok: {
        type: Sequelize.STRING,
      },
      contactName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      verified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      discarded: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      previousPosition: {
        type: Sequelize.INTEGER,
      },
      isStarred: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      ContestId: {
        type: Sequelize.UUID,
        references: {
          model: 'Contests',
          key: 'id',
        },
        allowNull: false,
      },
      MediumId: {
        type: Sequelize.UUID,
        references: {
            model: 'Media',
            key: 'id'
        },
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
      deletedAt: {
        type: Sequelize.DATE,
      },
    });

    await queryInterface.addIndex('Inscriptions', ['instagram', 'video', 'ContestId', 'year'], {
      unique: true,
    });
  },

  async down(queryInterface, Sequelize) {
    
    await queryInterface.removeIndex('Inscriptions', ['instagram', 'video', 'ContestId', 'year'], {
      unique: true
    })

    await queryInterface.dropTable('Inscriptions');
    
  },
};