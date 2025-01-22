/* 'use strict';

const Sequelize = require('sequelize')
const { DataTypes } = Sequelize
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.js')[env];

const sequelize = new Sequelize(
    { ...config },
)

// Models Import (Static import for individual models)

const Brand = require('./brand.js')(sequelize, DataTypes);
const Contest = require('./contest.js')(sequelize, DataTypes);
const ContestParam = require('./contestparam.js')(sequelize, DataTypes);
const ContestGenre = require('./contestgenre.js')(sequelize, DataTypes);
const ContestSocial = require('./contestsocial.js')(sequelize, DataTypes);
const ContestMedia = require('./contestmedia.js')(sequelize, DataTypes);
const ContestSponsor = require('./contestsponsor.js')(sequelize, DataTypes);
const ContestManager = require('./contestmanager.js')(sequelize, DataTypes);
const Genre = require('./genre.js')(sequelize, DataTypes);
const Inscription = require('./inscription.js')(sequelize, DataTypes);
const Log = require('./log.js')(sequelize, DataTypes);
const Manager = require('./manager.js')(sequelize, DataTypes);
const Media = require('./media.js')(sequelize, DataTypes);
const Param = require('./param.js')(sequelize, DataTypes);
const Role = require('./role.js')(sequelize, DataTypes);
const SocialMedia = require('./social-media.js')(sequelize, DataTypes);
const Sponsor = require('./sponsor.js')(sequelize, DataTypes);
const State = require('./state.js')(sequelize, DataTypes);
const TagType = require('./tag-type.js')(sequelize, DataTypes);
const Tag = require('./tag.js')(sequelize, DataTypes);
const TMRVote = require('./tmrvote.js')(sequelize, DataTypes);
const Vote = require('./vote.js')(sequelize, DataTypes);
const Voter = require('./voter.js')(sequelize, DataTypes);

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
};

 */