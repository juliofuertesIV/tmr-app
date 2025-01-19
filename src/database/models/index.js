'use strict';

const Sequelize = require('sequelize')
const { DataTypes } = Sequelize
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];
const sequelize = new Sequelize({ ...config })// Models Import (Static import for individual models)

const Brand = require('./brand')(sequelize, DataTypes);
const Contest = require('./contest')(sequelize, DataTypes);
const ContestParam = require('./contestparam')(sequelize, DataTypes);
const ContestGenre = require('./contestgenre')(sequelize, DataTypes);
const ContestSocial = require('./contestsocial')(sequelize, DataTypes);
const ContestMedia = require('./contestmedia')(sequelize, DataTypes);
const ContestSponsor = require('./contestsponsor')(sequelize, DataTypes);
const ContestManager = require('./contestmanager')(sequelize, DataTypes);
const Genre = require('./genre')(sequelize, DataTypes);
const Inscription = require('./inscription')(sequelize, DataTypes);
const Log = require('./log')(sequelize, DataTypes);
const Manager = require('./manager')(sequelize, DataTypes);
const Media = require('./media')(sequelize, DataTypes);
const Param = require('./param')(sequelize, DataTypes);
const Role = require('./role')(sequelize, DataTypes);
const SocialMedia = require('./social-media')(sequelize, DataTypes);
const Sponsor = require('./sponsor')(sequelize, DataTypes);
const State = require('./state')(sequelize, DataTypes);
const TagType = require('./tag-type')(sequelize, DataTypes);
const Tag = require('./tag')(sequelize, DataTypes);
const TMRVote = require('./tmrvote')(sequelize, DataTypes);
const Vote = require('./vote')(sequelize, DataTypes);
const Voter = require('./voter')(sequelize, DataTypes);

const models = [ 
  Brand,
  Contest,
  ContestParam,
  ContestGenre,
  ContestSocial,
  ContestMedia,
  ContestSponsor,
  ContestManager,
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
  Voter 
]

models.forEach((model) => {
  if (model.associate) {
      model.associate(sequelize.models);
  }
});

// Export the models to use them directly
export {
  Brand,
  Contest,
  ContestParam,
  ContestGenre,
  ContestSocial,
  ContestMedia,
  ContestSponsor,
  ContestManager,
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
    // Sequelize, // Export Sequelize itself for additional use
};
/* 
module.exports = db; // Named export
module.exports.default = db; // Default export for TypeScript
 */