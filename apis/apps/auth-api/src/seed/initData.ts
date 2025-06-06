export const roleSeed = {
  name: 'Administrator',
  hierarchyTier: 1,
};

export const permissionGroupSeed = [
  {
    name: 'Application',
  },
  {
    name: 'Inventory',
  },
  {
    name: 'Pricing',
  },
  {
    name: 'Promotion',
  },
  {
    name: 'Reports',
  },
  {
    name: 'Settings',
  },
];

export const permissionSeed = [
  {
    name: 'APPLICATION_LOGIN',
    permissionGroupName: 'Application',
  },
  {
    name: 'INVENTORY',
    permissionGroupName: 'Inventory',
  },
  {
    name: 'INVENTORY_ADJUSTMENTS',
    permissionGroupName: 'Inventory',
  },
  {
    name: 'INVENTORY_COUNTS',
    permissionGroupName: 'Inventory',
  },
  {
    name: 'PRICING',
    permissionGroupName: 'Pricing',
  },
  {
    name: 'PROMOTIONS',
    permissionGroupName: 'Promotion',
  },
  {
    name: 'REPORTS',
    permissionGroupName: 'Reports',
  },
  {
    name: 'REPORTS_INVENTORY',
    permissionGroupName: 'Reports',
  },
  {
    name: 'REPORTS_PRICING',
    permissionGroupName: 'Reports',
  },
  {
    name: 'REPORTS_PROMOTIONS',
    permissionGroupName: 'Reports',
  },
  {
    name: 'SETTINGS',
    permissionGroupName: 'Settings',
  },
  {
    name: 'EDIT_USER',
    permissionGroupName: 'Settings',
  },
  {
    name: 'CREATE_USER',
    permissionGroupName: 'Settings',
  },
  {
    name: 'EDIT_ROLE',
    permissionGroupName: 'Settings',
  },
  {
    name: 'CREATE_ROLE',
    permissionGroupName: 'Settings',
  },
  {
    name: 'EDIT_ITEM',
    permissionGroupName: 'Inventory',
  },
  {
    name: 'CREATE_ITEM',
    permissionGroupName: 'Inventory',
  },
  {
    name: 'EDIT_VENDOR',
    permissionGroupName: 'Inventory',
  },
  {
    name: 'CREATE_VENDOR',
    permissionGroupName: 'Inventory',
  },
  {
    name: 'EDIT_CATEGORY',
    permissionGroupName: 'Inventory',
  },
  {
    name: 'CREATE_CATEGORY',
    permissionGroupName: 'Inventory',
  },
];

export const applicationSeed = [
  {
    id: 1,
    name: 'PORTAL_UI',
    domain: 'http://localhost:4201',
    accessCode: 'dd41d292-14b7-4bf1-a7dc-4f75603f290b',
  },
  {
    id: 2,
    name: 'BNS_UI',
    domain: 'http://localhost:4200',
    accessCode: '1e75c53c-672b-4007-a33e-5bc1f989560f',
  },
  {
    id: 3,
    name: 'BNS_ADMIN',
    domain: 'http://localhost:4203',
    accessCode: 'bec80e09-0bda-4b8b-a1fb-0eeba750824e',
  },
  {
    id: 4,
    name: 'POS_UI',
    domain: 'http://localhost:3000',
    accessCode: 'f3390287-341a-4627-9f96-467928f6816c',
  },
];
