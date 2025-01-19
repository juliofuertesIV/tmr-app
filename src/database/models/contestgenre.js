'use strict';

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class ContestGenre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ContestGenre.belongsTo(models.Genre, { foreignKey: 'GenreId' });
      ContestGenre.belongsTo(models.Contest, { foreignKey: 'ContestId' });
    }
  }

  ContestGenre.init({
    GenreId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Genres',
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
    modelName: 'ContestGenre',
    paranoid: true
  })

  return ContestGenre
}
