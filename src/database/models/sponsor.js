'use strict';

const { Model } = require('sequelize')

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
    name: { 
        type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'Sponsor',
  });
  return Sponsor;
};