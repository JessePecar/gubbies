'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      {
        code: 'books',
        name: 'Books',
      },
      {
        code: 'dryFood',
        name: 'Dry Food',
      },
      {
        code: 'coldFood',
        name: 'Cold Food',
      },
      {
        code: 'frozenFood',
        name: 'Frozen Food',
      },
      {
        code: 'electronics',
        name: 'Electronics',
      },
      {
        code: 'cleaner',
        name: 'Cleaning Supplies',
      },
      {
        code: 'personalCare',
        name: 'Personal Care Items',
      },
      {
        code: 'seasonal',
        name: 'Seasonal',
      },
      {
        code: 'sporting',
        name: 'Sporting & Leisure',
      },
      {
        code: 'apparrel',
        name: 'Apparel',
      },
    ]);

    await queryInterface.bulkInsert('Items', [
      {
        name: 'Of Panda and Michael',
        categoryCode: 'books',
        quantityOnHand: 10,
        basePrice: 10.99,
        currentPrice: 10.99,
        isActive: true,
        retirementStatus: 0, // 0: Active,  1: Retiring, 2: Retired
        reorderQuantity: 0,
        unitOfMeasurementType: 0, // 0: Each, 1: Pounds, 2: Ounces
      },
      {
        name: 'Honey Nut Cheerios',
        categoryCode: 'dryFood',
        quantityOnHand: 2,
        basePrice: 4.95,
        currentPrice: 4.95,
        isActive: true,
        retirementStatus: 0, // 0: Active,  1: Retiring, 2: Retired
        reorderQuantity: 1,
        unitOfMeasurementType: 0, // 0: Each, 1: Pounds, 2: Ounces
      },
      {
        name: 'Computer Monitor',
        categoryCode: 'electronics',
        quantityOnHand: 4,
        basePrice: 127.99,
        currentPrice: 115.99,
        isActive: true,
        retirementStatus: 0, // 0: Active,  1: Retiring, 2: Retired
        reorderQuantity: 1,
        unitOfMeasurementType: 0, // 0: Each, 1: Pounds, 2: Ounces
      },
      {
        name: 'Orange',
        categoryCode: 'coldFood',
        quantityOnHand: 14,
        basePrice: 1.19,
        currentPrice: 1.19,
        isActive: true,
        retirementStatus: 0, // 0: Active,  1: Retiring, 2: Retired
        reorderQuantity: 5,
        unitOfMeasurementType: 1, // 0: Each, 1: Pounds, 2: Ounces
      },
      {
        name: 'Side Cutter Pliers',
        categoryCode: 'sporting',
        quantityOnHand: 1,
        basePrice: 13.46,
        currentPrice: 13.46,
        isActive: true,
        retirementStatus: 1, // 0: Active,  1: Retiring, 2: Retired
        reorderQuantity: 0,
        unitOfMeasurementType: 0, // 0: Each, 1: Pounds, 2: Ounces
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Items', null, {});
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
