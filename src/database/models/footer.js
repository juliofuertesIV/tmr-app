'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Footer extends Model {
    static associate(models) {
        Footer.hasOne(models.Contest);
        Footer.Sponsors = Footer.belongsToMany(models.Sponsor, { through: 'FooterSponsors' })
    }
  }  Footer.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Footer',
    timestamps: false, // Disable createdAt and updatedAt
  });  return Footer;
};
