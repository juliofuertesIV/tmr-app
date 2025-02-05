'use strict';

const { Model, Sequelize } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class FooterSponsor extends Model {
    static associate(models) {
      FooterSponsor.belongsTo(models.Footer, { foreignKey: 'FooterId', onDelete: 'CASCADE' });
      FooterSponsor.belongsTo(models.Sponsor, { foreignKey: 'SponsorId', onDelete: 'CASCADE' });
    }
  }

  FooterSponsor.init({
    FooterId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Footer',
        key: 'id',
      },
      primaryKey: true,
    },
    SponsorId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Media',
        key: 'id',
      },
      primaryKey: true,
    },
    order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    }
  }, {
    sequelize,
    modelName: 'FooterSponsor',
    paranoid: true
  })

  return FooterSponsor
}
