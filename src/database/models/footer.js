'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Footer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     */
    static associate(models) {
        Footer.hasOne(models.Contest);
        Footer.belongsToMany(models.Media, { through: 'FooterMedia', onDelete: 'CASCADE' });
    }
  }  Footer.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Footer',
    timestamps: false, // Disable createdAt and updatedAt
  });  return Footer;
};
