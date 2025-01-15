'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('SocialMedia', [
        {
            id: 'ig',
            name: 'Instagram',
            icon: 'instagram'
        },
        {
            id: 'tiktok',
            name: 'TikTok',
            icon: 'tiktok'
        }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('SocialMedia', null, {});
  }
};