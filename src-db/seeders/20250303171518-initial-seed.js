'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Roles', [
      {
        name: 'Administrator',
      },
    ]);

    await queryInterface.bulkInsert('Permissions', [
      { name: 'APPLICATION_LOGIN' },
      { name: 'INVENTORY' },
      { name: 'INVENTORY_ADJUSTMENTS' },
      { name: 'INVENTORY_COUNTS' },
      { name: 'PRICING' },
      { name: 'PROMOTIONS' },
      { name: 'REPORTS' },
      { name: 'REPORTS_INVENTORY' },
      { name: 'REPORTS_PRICING' },
      { name: 'REPORTS_PROMOTIONS' },
      { name: 'SETTINGS' },
    ]);

    await queryInterface.bulkInsert('RolePermissions', [
      { roleId: 0, permissionId: 1 },
      { roleId: 0, permissionId: 2 },
      { roleId: 0, permissionId: 3 },
      { roleId: 0, permissionId: 4 },
      { roleId: 0, permissionId: 5 },
      { roleId: 0, permissionId: 6 },
      { roleId: 0, permissionId: 7 },
      { roleId: 0, permissionId: 8 },
      { roleId: 0, permissionId: 9 },
      { roleId: 0, permissionId: 10 },
      { roleId: 0, permissionId: 11 },
    ]);

    await queryInterface.bulkInsert('Users', [
      {
        firstName: 'admin',
        lastName: 'user',
        roleId: 1,
        userName: 'admin',
        password: 'password',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('RolePermissions', null, {});
    await queryInterface.bulkDelete('Permissions', null, {});
    await queryInterface.bulkDelete('Roles', null, {});
  },
};
