'use strict';

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class TMRVote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      TMRVote.belongsTo(models.Inscription, { foreignKey: 'ContestantId' });
      TMRVote.belongsTo(models.Manager, { foreignKey: 'ManagerId' });
    }
  }  TMRVote.init({
    weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
  }, {
    sequelize,
    modelName: 'TMRVote',
    paranoid: true
  });
  return TMRVote;
}
