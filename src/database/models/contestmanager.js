'use strict';

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class ContestManager extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ContestManager.belongsTo(models.Manager, { foreignKey: 'ManagerId' });
      ContestManager.belongsTo(models.Contest, { foreignKey: 'ContestId' });
    }
  }

  ContestManager.init({
    ManagerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Managers',
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
    modelName: 'ContestManager',
    paranoid: true
  })

  return ContestManager
}
