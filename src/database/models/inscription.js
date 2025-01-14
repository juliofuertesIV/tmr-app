'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Inscription extends Model {
    static associate(models) {
      Inscription.belongsTo(models.Contest, { foreignKey: 'ContestId' });
      Inscription.belongsTo(models.Media, { onDelete: 'CASCADE' })
      Inscription.hasMany(models.Vote)
    }
  }

  Inscription.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
    },
    genre: {
      type: DataTypes.STRING,
    },
    video: {
      type: DataTypes.STRING,
    },
    instagram: {
      type: DataTypes.STRING,
    },
    spotify: {
      type: DataTypes.STRING,
    },
    tiktok: {
      type: DataTypes.STRING,
    },
    contactName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    discarded: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    previousPosition: {
      type: DataTypes.INTEGER,
    },
    internalVoteQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    isStarred: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'Inscription',
    paranoid: true,
    indexes: [
      {
        fields: ['instagram', 'video', 'ContestId', 'year'],
        unique: true,
      },
    ],
    hooks: {
      beforeCreate: (record) => {
        record.dataValues.year = new Date().getUTCFullYear();
      },
    },
  });

  return Inscription;
};