'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Genres', [
        {
            name: 'Pop'
        },
        {
            name: 'Rock'
        },
        {
            name: 'Punk'
        },
        {
            name: 'Urbana'
        },
        {
            name: 'Rap'
        }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Genres', null, {});
  }
};
