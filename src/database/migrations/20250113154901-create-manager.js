'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Managers', {
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
          hash: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          salt: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          email: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
              isEmail: true,
            },
          },
          RoleId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1,
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
        await queryInterface.dropTable('Managers');
      },
};
