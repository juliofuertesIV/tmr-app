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
        Contest.Params = Contest.belongsToMany(models.Param, { through: 'ContestParams'})
        Contest.SocialMedia = Contest.belongsToMany(models.SocialMedia, { through: 'ContestSocials' });
        Contest.Managers = Contest.belongsToMany(models.Manager, { through: 'ManagerContests' });
        Contest.Voters = Contest.hasMany(models.Voter);
        Contest.Brand = Contest.belongsTo(models.Brand);
        Contest.State = Contest.belongsTo(models.State);
        Contest.Footer = Contest.belongsTo(models.Footer);
        Contest.Logo = Contest.belongsTo(models.Media, { as: 'Logo', foreignKey: 'LogoId', onDelete: 'SET NULL' });
        Contest.Banner = Contest.belongsTo(models.Media, { as: 'Banner', foreignKey: 'BannerId', onDelete: 'SET NULL' });
        Contest.Frame = Contest.belongsTo(models.Media, { as: 'Frame', foreignKey: 'FrameId', onDelete: 'SET NULL' });
        Contest.Favicon = Contest.belongsTo(models.Media, { as: 'Favicon', foreignKey: 'FaviconId', onDelete: 'SET NULL' });
        Contest.Inscriptions = Contest.hasMany(models.Inscription);
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