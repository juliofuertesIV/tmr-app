'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('SocialMedia', {
          id: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false,
          },
          name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          icon: {
            type: Sequelize.STRING,
            allowNull: false,
          }
        });
      },
    
      async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('SocialMedia');
      },
};
