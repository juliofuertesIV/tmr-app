'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Contests', {
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
      domain: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      year: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      bannerHref: {
        type: Sequelize.STRING,
      },
      metaUrl: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      metaTitle: {
        type: Sequelize.STRING,
      },
      metaDescription: {
        type: Sequelize.TEXT,
      },
      postmarkToken: {
        type: Sequelize.STRING,
      },
      postmarkSenderAddress: {
        type: Sequelize.STRING,
      },
      googleAnalyticsId: {
        type: Sequelize.STRING,
      },
      googleTagManagerId: {
        type: Sequelize.STRING,
      },
      metaPixelId: {
        type: Sequelize.STRING,
      },
      termsAndConditions: {
        type: Sequelize.TEXT,
      },
      StateId: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
            model: 'States',
            key: 'id'
        },
        defaultValue: 'hidden',
      },
      BrandId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Brands',
            key: 'id'
        }
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

    await queryInterface.addIndex('Contests', ['domain', 'year'], {
      unique: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Contests');
  },
};