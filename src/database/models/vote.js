'use strict';

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Vote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Vote.belongsTo(models.Inscription, { foreignKey: 'ContestantId', onDelete: 'CASCADE' });
      Vote.belongsTo(models.Voter, { foreignKey: 'VoterId', onDelete: 'CASCADE' });
    }
  }

  Vote.init({
    ContestantId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Inscriptions',
        key: 'id',
      },
      primaryKey: true,
    },
    VoterId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Voters',
        key: 'id',
      },
      primaryKey: true,
    }
  }, {
    sequelize,
    modelName: 'Vote',
    paranoid: true
  })

  return Vote
}
