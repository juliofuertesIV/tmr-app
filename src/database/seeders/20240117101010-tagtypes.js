'use strict';

const tagtypes = require('./data/tagTypes')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('TagTypes', tagtypes);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('TagTypes', null, {});
  }
}