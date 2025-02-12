'use strict';

const { getScopes } = require('./scopes/contests')
const { Model } = require('sequelize');

const extractedSubdomainString = (value) => {
    
    if (value.includes('www.')) throw new Error('Subdominio mal formado. Incluye "www" y no debería.')

    const domainString = value.replace('https://', '')

    return [domainString.split('.')[0], domainString.split('.')[1]].join('-')
}


module.exports = (sequelize, DataTypes) => {
    
    class Contest extends Model {
    static associate(models) {
        Contest.belongsToMany(models.Param, { through: 'ContestParams'})
        Contest.belongsToMany(models.SocialMedia, { through: 'ContestSocials' });
        Contest.belongsToMany(models.Manager, { through: 'ManagerContests' });
        Contest.hasMany(models.Voter);
        Contest.hasMany(models.Voter);
        Contest.belongsTo(models.Brand);
        Contest.belongsTo(models.State);
        Contest.belongsTo(models.Footer);
        Contest.belongsTo(models.Media, { as: 'Logo', foreignKey: 'LogoId', onDelete: 'SET NULL' });
        Contest.belongsTo(models.Media, { as: 'Banner', foreignKey: 'BannerId', onDelete: 'SET NULL' });
        Contest.belongsTo(models.Media, { as: 'Frame', foreignKey: 'FrameId', onDelete: 'SET NULL' });
        Contest.belongsTo(models.Media, { as: 'Favicon', foreignKey: 'FaviconId', onDelete: 'SET NULL' });
        Contest.hasMany(models.Inscription);   
      }
  }  Contest.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    domain: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bannerHref: {
      type: DataTypes.STRING,
    },
    metaUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    metaTitle: {
      type: DataTypes.STRING,
    },
    metaDescription: {
      type: DataTypes.TEXT,
    },
    postmarkToken: {
      type: DataTypes.STRING,
    },
    postmarkSenderAddress: {
      type: DataTypes.STRING,
    },
    googleAnalyticsId: {
      type: DataTypes.STRING,
    },
    googleTagManagerId: {
      type: DataTypes.STRING,
    },
    metaPixelId: {
      type: DataTypes.STRING,
    },
    termsAndConditions: {
      type: DataTypes.TEXT,
    }
  }, {
    sequelize,
    modelName: 'Contest',
    paranoid: true,
    indexes: [
      {
        fields: ['domain', 'year'],
        unique: true,
      },
    ],
    scopes: getScopes(sequelize.models),
    defaultScope: getScopes(sequelize.models).public,
    hooks: {
      beforeValidate: (record) => {
        if (!record.dataValues.metaUrl) return; 
        const parsedDomain = extractedSubdomainString(record.dataValues.metaUrl);
        if (parsedDomain === record.dataValues.domain) return;
        record.dataValues.domain = parsedDomain;
      }
    },
  });  
  return Contest;
};