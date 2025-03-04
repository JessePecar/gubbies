'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AdjustmentItems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AdjustmentItems.init(
    {
      adjustmentId: DataTypes.NUMBER,
      itemId: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: 'AdjustmentItems',
      createdAt: false,
      updatedAt: false,
    }
  );
  return AdjustmentItems;
};
