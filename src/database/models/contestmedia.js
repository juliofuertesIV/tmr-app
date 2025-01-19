'use strict';

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class ContestMedia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ContestMedia.belongsTo(models.Media, { foreignKey: 'MediumId' });
      ContestMedia.belongsTo(models.Contest, { foreignKey: 'ContestId' });
    }
  }

  ContestMedia.init({
    MediumId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Medias',
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
    modelName: 'ContestMedia'
  })

  return ContestMedia
}
