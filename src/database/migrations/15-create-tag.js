'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tags', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      TagCategoryId: {
        type: Sequelize.STRING,
        references: {
            model: 'TagCategories',
            key: 'id'
        },
        allowNull: false
      },
    });

    await queryInterface.addIndex('Tags', ['name', 'TagCategoryId'], {
      unique: true,
    });
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.removeIndex('Tags', ['name', 'TagCategoryId'], {
      unique: true
    })

    await queryInterface.dropTable('Tags');
  },
};