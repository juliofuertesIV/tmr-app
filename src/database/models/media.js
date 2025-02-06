'use strict';

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Media extends Model {
    static associate(models) {
        Media.hasOne(models.Contest, { as: 'Logo', foreignKey: 'LogoId', onDelete: 'CASCADE' })
        Media.hasOne(models.Contest, { as: 'Frame', foreignKey: 'FrameId', onDelete: 'CASCADE' })
        Media.hasOne(models.Contest, { as: 'Banner', foreignKey: 'BannerId', onDelete: 'CASCADE' })
        Media.hasOne(models.Contest, { as: 'Favicon', foreignKey: 'FaviconId', onDelete: 'CASCADE' })
        Media.hasOne(models.Manager, { foreignKey: 'MediumId' })
        Media.hasOne(models.Inscription, { foreignKey: 'MediumId' })
        Media.hasOne(models.Sponsor, { foreignKey: 'MediumId' })
    }
  }
  Media.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    src: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    filename: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    folder: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    width: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    alt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Media',
  });
  return Media;
};