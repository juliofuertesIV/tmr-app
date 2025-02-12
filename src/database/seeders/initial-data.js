'use strict';

const crypto = require('crypto')
const path = require('path')

const { v4: uuidv4 } = require('uuid');
const brands = require('./data/brands')
const socialMedia = require('./data/socialmedia')
const params = require('./data/params')
const states = require('./data/states')
const roles = require('./data/roles')
const tagCategories = require('./data/tagCategories')
const tags = require('./data/tags')

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: path.resolve(__dirname, '../../../.env.local') });
}


const getSuperAdmin = () => {

    const password = process.env.SUPERADMIN_PASS

    if (!password || typeof password !== 'string') throw new Error('Bad password fed to hash generation.')

    const salt = crypto.randomBytes(16).toString('hex')
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex')

    const superAdmin = {
        id: uuidv4(),
        name:  process.env.SUPERADMIN_NAME,
        email: process.env.SUPERADMIN_EMAIL,
        hash,
        salt,
        RoleId: process.env.SUPERADMIN_ROLE_ID  
    }

    return superAdmin
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const superAdmin = getSuperAdmin()

    await queryInterface.bulkInsert('Brands', brands)
    await queryInterface.bulkInsert('SocialMedia', socialMedia);
    await queryInterface.bulkInsert('States', states);
    await queryInterface.bulkInsert('Params', params)
    await queryInterface.bulkInsert('TagCategories', tagCategories);
    await queryInterface.bulkInsert('Tags', tags);
    await queryInterface.bulkInsert('Roles', roles);
    await queryInterface.bulkInsert('Managers', [superAdmin]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tags', null, {});
    await queryInterface.bulkDelete('TagCategories', null, {});
    await queryInterface.bulkDelete('Brands', null, {});
    await queryInterface.bulkDelete('SocialMedia', null, {});
    await queryInterface.bulkDelete('States', null, {});
    await queryInterface.bulkDelete('Params', null, {});
    await queryInterface.bulkDelete('Managers', null, {});
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
