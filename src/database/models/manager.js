'use strict';

const { getScopes } = require('./scopes/managers')
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Manager extends Model {
    static associate(models) {
        Manager.belongsToMany(models.Contest, { through: 'ManagerContests', })
        Manager.belongsTo(models.Media, { foreignKey: 'MediumId', onDelete: 'SET NULL' })
        Manager.belongsTo(models.Role),
        Manager.hasMany(models.Log)
    }
  }
  Manager.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    hash: {
      type: DataTypes.STRING,
      allowNull: false
    },
    salt: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true // Ensure valid email format
      }
    }
  }, {
    sequelize,
    scopes: getScopes(sequelize.models),
    defaultScope: getScopes(sequelize.models).list,
    modelName: 'Manager',
  });
  return Manager;
};