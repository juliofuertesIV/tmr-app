'use strict';

const { Model, Sequelize } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Sponsor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Sponsor.belongsToMany(models.Contest, { through: 'ContestSponsors' })
        Sponsor.belongsTo(models.Media, { foreignKey: 'MediumId' })
    }
  }
  Sponsor.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    name: { 
        type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'Sponsor',
  });
  return Sponsor;
};