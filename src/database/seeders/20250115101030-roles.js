'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Roles', [
        {
            id: 1,
            name: 'Colaborador',
        },
        {
            id: 2,
            name: 'Editor'
        },
        {
            id: 3,
            name: 'Admin'
        },
        {
            id: 4,
            name: 'Super Admin'
        }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};