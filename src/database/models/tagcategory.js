'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TagCategory extends Model {
    static associate(models) {
        TagCategory.hasMany(models.Tag)
    }
  }  TagCategory.init({
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'TagCategory',
    timestamps: false, // Disable createdAt and updatedAt
  });  return TagCategory;
};