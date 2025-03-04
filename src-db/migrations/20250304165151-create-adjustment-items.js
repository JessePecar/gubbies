'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('AdjustmentItems', {
      adjustmentId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.NUMBER,
      },
      itemId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.NUMBER,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('AdjustmentItems');
  },
};
