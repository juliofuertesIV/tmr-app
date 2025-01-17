'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    static associate(models) {
        Tag.belongsToMany(models.Inscription, { through: 'InscriptionTags' })
        Tag.belongsTo(models.TagType)
    }
  }

  Tag.init({
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
    modelName: 'Tag',
    timestamps: false, // Disable createdAt and updatedAt
  });

  return Tag;
};