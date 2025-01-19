'use strict';

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  
  class InscriptionTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      InscriptionTag.belongsTo(models.Tag, { foreignKey: 'TagId' });
      InscriptionTag.belongsTo(models.Inscription, { foreignKey: 'InscriptionId' });
    }
  }

  InscriptionTag.init({
    TagId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Tags',
        key: 'id',
      },
      primaryKey: true,
    },
    InscriptionId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Inscriptions',
        key: 'id',
      },
      primaryKey: true,
    }
  }, {
    sequelize,
    modelName: 'InscriptionTag',
    paranoid: true
  })

  return InscriptionTag
}
