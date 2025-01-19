'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    static associate(models) {
        Brand.hasMany(models.Contest)
    }
  }
  Brand.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    website: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    backgroundColor: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '#e9e9e9',
    },
    foregroundColor: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '#121212',
    },
    accentColor: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'crimson',
    },
    instagramProfile: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tiktokProfile: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Brand',
  });
  return Brand;
};