'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tag extends Model {
    static associate(models) {
      Tag.belongsToMany(models.Inscription, { through: 'InscriptionTags' });
      Tag.belongsTo(models.TagType, { foreignKey: 'TagTypeId' });
    }
  }  Tag.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    TagTypeId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Tag',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['name', 'TagTypeId'], // Enforce the unique combination of name and TagTypeId
      },
    ],
  });  return Tag;
};
