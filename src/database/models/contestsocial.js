'use strict';

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class ContestSocial extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ContestSocial.belongsTo(models.SocialMedia, { foreignKey: 'SocialMediumId' });
      ContestSocial.belongsTo(models.Contest, { foreignKey: 'ContestId' });
    }
  }

  ContestSocial.init({
    SocialMediumId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'SocialMedia',
        key: 'id',
      },
      primaryKey: true,
    },
    ContestId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Contests',
        key: 'id',
      },
      primaryKey: true,
    }
  }, {
    sequelize,
    modelName: 'ContestSocial',
    paranoid: true
  })

  return ContestSocial
}
