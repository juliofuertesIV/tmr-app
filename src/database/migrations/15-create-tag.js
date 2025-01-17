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
      TagTypeId: {
        type: Sequelize.STRING,
        references: {
            model: 'TagTypes',
            key: 'id'
        },
        allowNull: false
      },
    });

    await queryInterface.addIndex('Tags', ['name', 'TagTypeId'], {
      unique: true,
    });
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.removeIndex('Tags', ['name', 'TagTypeId'], {
      unique: true
    })

    await queryInterface.dropTable('Tags');
  },
};