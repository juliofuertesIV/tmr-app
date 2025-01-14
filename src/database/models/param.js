'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Param extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     */
    static associate(models) {
        Param.belongsToMany(models.Contest, { through: 'ContestParams'})
    }
  }

  Param.init({
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Param',
    timestamps: false, // Disable createdAt and updatedAt
  });

  return Param;
};