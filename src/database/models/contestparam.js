'use strict';

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class ContestParam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ContestParam.belongsTo(models.Param, { foreignKey: 'ParamId' });
      ContestParam.belongsTo(models.Contest, { foreignKey: 'ContestId' });
    }
  }

  ContestParam.init({
    ParamId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Params',
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
    modelName: 'ContestParam',
    paranoid: true
  })

  return ContestParam
}
