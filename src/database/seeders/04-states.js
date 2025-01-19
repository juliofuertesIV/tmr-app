'use strict';

const states = require('./data/states')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('States', states);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('States', null, {});
  }
};