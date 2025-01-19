'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TagType extends Model {
    static associate(models) {
        TagType.hasMany(models.Tag)
    }
  }  TagType.init({
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
    modelName: 'TagType',
    timestamps: false, // Disable createdAt and updatedAt
  });  return TagType;
};