'use strict';
require('dotenv').config({path: '../../../.env.local'});

/** @type {import('sequelize-cli').Migration} */

console.log(process.env)

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Managers', [{ 
            name: process.env.SUPERADMIN_USERNAME,
            email: process.env.SUPERADMIN_EMAIL,
            hash: process.env.SUPERADMIN_HASH,
            salt: process.env.SUPERADMIN_SALT,
            RoleId: process.env.SUPERADMIN_ROLE_ID
        }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Managers', null, {});
  }
};
