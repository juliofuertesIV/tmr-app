'use strict';

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class FooterMedia extends Model {
    static associate(models) {
      FooterMedia.belongsTo(models.Footer, { foreignKey: 'FooterId', onDelete: 'CASCADE' });
      FooterMedia.belongsTo(models.Media, { foreignKey: 'MediumId' });
    }
  }

  FooterMedia.init({
    FooterId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Footer',
        key: 'id',
      },
      primaryKey: true,
    },
    MediumId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Media',
        key: 'id',
      },
      primaryKey: true,
    }
  }, {
    sequelize,
    modelName: 'FooterMedia',
    paranoid: true
  })

  return FooterMedia
}
