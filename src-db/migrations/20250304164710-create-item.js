'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      categoryCode: {
        type: Sequelize.STRING,
      },
      quantityOnHand: {
        type: Sequelize.STRING,
      },
      basePrice: {
        type: Sequelize.NUMBER,
      },
      currentPrice: {
        type: Sequelize.STRING,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
      },
      retirementStatus: {
        type: Sequelize.NUMBER,
      },
      reorderQuantity: {
        type: Sequelize.NUMBER,
      },
      unitOfMeasurementType: {
        type: Sequelize.NUMBER,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Items');
  },
};
