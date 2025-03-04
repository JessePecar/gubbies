'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Adjustment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Adjustment.init(
    {
      createDate: DataTypes.DATE,
      status: DataTypes.NUMBER,
      completeDate: { type: DataTypes.DATE, allowNull: true },
    },
    {
      sequelize,
      modelName: 'Adjustment',
      createdAt: false,
      updatedAt: false,
    }
  );
  return Adjustment;
};
