'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Log extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     */
    static associate(models) {
      // Define associations if needed in the future
    }
  }

  Log.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    errorCause: {
      type: DataTypes.STRING,
    },
    digest: {
      type: DataTypes.STRING,
    },
    route: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    blame: {
      type: DataTypes.STRING,
    },
    collection: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Log',
    timestamps: true, // Includes createdAt and updatedAt
  });

  return Log;
};
Migra