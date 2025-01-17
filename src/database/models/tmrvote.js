'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TMRVote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Vote.belongsTo(models.Inscription, { foreignKey: 'ContestantId' });
      Vote.belongsTo(models.Manager, { foreignKey: 'ManagerId' });
    }
  }

  TMRVote.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    weight: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
  }, {
    sequelize,
    modelName: 'Voter',
    paranoid: true
  });
  return Voter;
}
