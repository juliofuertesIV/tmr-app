'use strict';

const socialMedia = require('./data/socialmedia')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('SocialMedia', socialMedia);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('SocialMedia', null, {});
  }
};