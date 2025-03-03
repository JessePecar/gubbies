'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RolePermission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RolePermission.init(
    {
      roleId: { type: DataTypes.NUMBER, unique: 'rolePermissionKey' },
      permissionId: { type: DataTypes.NUMBER, unique: 'rolePermissionKey' },
    },
    {
      sequelize,
      modelName: 'RolePermission',
      createdAt: false,
      updatedAt: false,
    }
  );
  return RolePermission;
};
