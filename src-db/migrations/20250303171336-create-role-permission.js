'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RolePermissions', {
      roleId: {
        primaryKey: true,
        unique: 'rolePermissionCompositeKey',
        type: Sequelize.NUMBER,
      },
      permissionId: {
        primaryKey: true,
        unique: 'rolePermissionCompositeKey',
        type: Sequelize.NUMBER,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('RolePermissions');
  },
};
