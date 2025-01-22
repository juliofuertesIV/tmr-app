'use strict';

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class ContestSponsor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ContestSponsor.belongsTo(models.Sponsor, { foreignKey: 'SponsorId', onDelete: 'CASCADE' });
      ContestSponsor.belongsTo(models.Contest, { foreignKey: 'ContestId' });
    }
  }

  ContestSponsor.init({
    SponsorId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Sponsors',
        key: 'id',
      },
      primaryKey: true,
    },
    ContestId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Contests',
        key: 'id',
      },
      primaryKey: true,
    }
  }, {
    sequelize,
    modelName: 'ContestSponsor',
    paranoid: true
  })

  return ContestSponsor
}
