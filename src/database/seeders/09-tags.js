'use strict';

const tags = require('./data/tags')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('tags', tags);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('tags', null, {});
  }
};
