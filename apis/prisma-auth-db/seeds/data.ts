export const roles = [
  {
    name: 'Administrator',
    hierarchyTier: 1,
  },
];

export const permissionGroupSeed = [
  {
    id: 1,
    name: 'Application',
  },
  {
    id: 2,
    name: 'Inventory',
  },
  {
    id: 3,
    name: 'Pricing',
  },
  {
    id: 4,
    name: 'Promotion',
  },
  {
    id: 5,
    name: 'Reports',
  },
  {
    id: 6,
    name: 'Settings',
  },
];

export const permissionSeed = [
  {
    id: 1,
    name: 'APPLICATION_LOGIN',
    permissionGroupId: 1,
  },
  {
    id: 2,
    name: 'INVENTORY',
    permissionGroupId: 2,
  },
  {
    id: 3,
    name: 'INVENTORY_ADJUSTMENTS',
    permissionGroupId: 2,
  },
  {
    id: 4,
    name: 'INVENTORY_COUNTS',
    permissionGroupId: 2,
  },
  {
    id: 5,
    name: 'PRICING',
    permissionGroupId: 3,
  },
  {
    id: 6,
    name: 'PROMOTIONS',
    permissionGroupId: 4,
  },
  {
    id: 7,
    name: 'REPORTS',
    permissionGroupId: 5,
  },
  {
    id: 8,
    name: 'REPORTS_INVENTORY',
    permissionGroupId: 5,
  },
  {
    id: 9,
    name: 'REPORTS_PRICING',
    permissionGroupId: 5,
  },
  {
    id: 10,
    name: 'REPORTS_PROMOTIONS',
    permissionGroupId: 5,
  },
  {
    id: 11,
    name: 'SETTINGS',
    permissionGroupId: 6,
  },
  {
    id: 12,
    name: 'EDIT_USER',
    permissionGroupId: 6,
  },
  {
    id: 13,
    name: 'CREATE_USER',
    permissionGroupId: 6,
  },
  {
    id: 14,
    name: 'EDIT_ROLE',
    permissionGroupId: 6,
  },
  {
    id: 15,
    name: 'CREATE_ROLE',
    permissionGroupId: 6,
  },
  {
    id: 16,
    name: 'EDIT_ITEM',
    permissionGroupId: 2,
  },
  {
    id: 17,
    name: 'CREATE_ITEM',
    permissionGroupId: 2,
  },
  {
    id: 18,
    name: 'EDIT_VENDOR',
    permissionGroupId: 2,
  },
  {
    id: 19,
    name: 'CREATE_VENDOR',
    permissionGroupId: 2,
  },
  {
    id: 20,
    name: 'EDIT_CATEGORY',
    permissionGroupId: 2,
  },
  {
    id: 21,
    name: 'CREATE_CATEGORY',
    permissionGroupId: 2,
  },
];
