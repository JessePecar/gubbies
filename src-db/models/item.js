'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Item.init(
    {
      name: DataTypes.STRING,
      categoryCode: DataTypes.STRING,
      quantityOnHand: DataTypes.STRING,
      basePrice: DataTypes.NUMBER,
      currentPrice: DataTypes.STRING,
      isActive: DataTypes.BOOLEAN,
      retirementStatus: DataTypes.NUMBER,
      reorderQuantity: DataTypes.NUMBER,
      unitOfMeasurementType: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: 'Item',
      createdAt: false,
      updatedAt: false,
    }
  );
  return Item;
};
