'use strict';

const { getScopes } = require('./scopes/managers')
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Manager extends Model {
    static associate(models) {
        Manager.Contest = Manager.belongsToMany(models.Contest, { through: 'ManagerContests' })
        Manager.Media = Manager.belongsTo(models.Media, { foreignKey: 'MediumId', onDelete: 'SET NULL' })
        Manager.Role = Manager.belongsTo(models.Role),
        Manager.Log = Manager.hasMany(models.Log)
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
    },
    RoleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Roles',
            key: 'id'
        }
    }
  }, {
    sequelize,
    modelName: 'Manager',
  });
  return Manager;
};