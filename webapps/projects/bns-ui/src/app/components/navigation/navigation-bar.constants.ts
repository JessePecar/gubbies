import { PermissionEnum } from '@/core/types/role';

export const navigationOptions: {
  section: string;
  routes: {
    name: string;
    route: string[];
    permission?: PermissionEnum;
  }[];
}[] = [
  {
    section: 'Inventory',
    routes: [
      {
        name: 'Adjustments',
        route: ['inventory', 'adjustments'],
        permission: PermissionEnum.INVENTORY_ADJUSTMENTS,
      },
      {
        name: 'Counts',
        route: ['inventory', 'counts'],
        permission: PermissionEnum.INVENTORY_COUNTS,
      },
      {
        name: 'Items',
        route: ['inventory', 'items', 'list'],
        permission: PermissionEnum.INVENTORY,
      },
      {
        name: 'Vendors',
        route: ['inventory', 'vendors', 'list'],
        permission: PermissionEnum.INVENTORY,
      },
      {
        name: 'Categories',
        route: ['inventory', 'categories', 'category-list'],
        permission: PermissionEnum.INVENTORY,
      },
    ],
  },
  {
    section: 'Pricing',
    routes: [
      {
        name: 'Item Pricing',
        route: ['pricing', 'item-list'],
      },
      {
        name: 'Price Buckets',
        route: ['pricing', 'buckets'],
      },
    ],
  },
  {
    section: 'Promotions',
    routes: [
      {
        name: 'Active Promotions',
        route: ['active-promotion'],
      },
      {
        name: 'Manage Promotions',
        route: ['manage-promotion'],
      },
    ],
  },
  {
    section: 'Reports',
    routes: [
      {
        name: 'Inventory',
        route: ['reports', 'inventory'],
      },
      {
        name: 'Pricing',
        route: ['reports', 'pricing'],
      },
      {
        name: 'Promotions',
        route: ['reports', 'promotions'],
      },
    ],
  },
  {
    section: 'Settings',
    routes: [
      {
        name: 'Users',
        route: ['settings', 'users', 'list'],
      },
      {
        name: 'Roles',
        route: ['settings', 'roles', 'list'],
      },
      {
        name: 'Settings',
        route: ['settings', 'store'],
      },
    ],
  },
];
