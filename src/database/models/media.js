'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Media extends Model {
    static associate(models) {
        Media.belongsToMany(models.Contest, { through: 'ContestMedia' })
        Media.hasOne(models.Manager, { onDelete: 'CASCADE', foreignKey: 'MediumId' })
        Media.hasOne(models.Inscription, { onDelete: 'CASCADE', foreignKey: 'MediumId' })
        Media.hasOne(models.Sponsor, { onDelete: 'CASCADE', foreignKey: 'MediumId' })
    }
  }
  Media.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    src: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    width: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    alt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Media',
  });
  return Media;
};