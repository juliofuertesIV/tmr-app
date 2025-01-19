'use strict';

// Models Import (Static import for individual models)
import Brand from './brand';
import Contest from './contest';
import Genre from './genre';
import Inscription from './inscription';
import Log from './log';
import Manager from './manager';
import Media from './media';
import Param from './param';
import Role from './role';
import SocialMedia from './social-media';
import Sponsor from './sponsor';
import State from './state';
import TagType from './tag-type';
import Tag from './tag';
import TMRVote from './tmrvote';
import Vote from './vote';
import Voter from './voter';

const Sequelize = require('sequelize');
const process = require('process');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];
const db = {};

const sequelize = new Sequelize({ ...config });

/* Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
 */
db.sequelize = sequelize;
db.Sequelize = Sequelize;



// Export the models to use them directly
export {
    Brand,
    Contest,
    Genre,
    Inscription,
    Log,
    Manager,
    Media,
    Param,
    Role,
    SocialMedia,
    Sponsor,
    State,
    TagType,
    Tag,
    TMRVote,
    Vote,
    Voter,
    sequelize, // Export sequelize instance if needed elsewhere
    Sequelize, // Export Sequelize itself for additional use
};
/* 
module.exports = db; // Named export
module.exports.default = db; // Default export for TypeScript
 */