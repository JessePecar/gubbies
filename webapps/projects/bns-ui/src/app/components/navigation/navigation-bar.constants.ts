import { DropdownItem } from '@/core/components/navigation';
import { PermissionEnum } from '@/core/types/role';

export const navigationOptions: {
  section: string;
  permissionId: PermissionEnum;
  routes: DropdownItem[];
}[] = [
  {
    section: 'Inventory',
    permissionId: PermissionEnum.INVENTORY,
    routes: [
      {
        name: 'Adjustments',
        route: ['inventory', 'adjustments'],
        permissionId: PermissionEnum.INVENTORY_ADJUSTMENTS,
      },
      {
        name: 'Counts',
        route: ['inventory', 'counts'],
        permissionId: PermissionEnum.INVENTORY_COUNTS,
      },
      {
        name: 'Items',
        route: ['inventory', 'items', 'list'],
        permissionId: PermissionEnum.INVENTORY,
      },
      // {
      //   name: 'Vendors',
      //   route: ['inventory', 'vendors', 'list'],
      //   permissionId: PermissionEnum.INVENTORY,
      // },
      {
        name: 'Categories',
        route: ['inventory', 'categories', 'category-list'],
        permissionId: PermissionEnum.INVENTORY,
      },
    ],
  },
  // {
  //   section: 'Pricing',
  //   permissionId: PermissionEnum.PRICING,
  //   routes: [
  //     {
  //       name: 'Item Pricing',
  //       route: ['pricing', 'item-list'],
  //     },
  //     {
  //       name: 'Price Buckets',
  //       route: ['pricing', 'buckets'],
  //     },
  //   ],
  // },
  // {
  //   section: 'Promotions',
  //   permissionId: PermissionEnum.PROMOTIONS,
  //   routes: [
  //     {
  //       name: 'Active Promotions',
  //       route: ['active-promotion'],
  //     },
  //     {
  //       name: 'Manage Promotions',
  //       route: ['manage-promotion'],
  //     },
  //   ],
  // },
  // {
  //   section: 'Reports',
  //   permissionId: PermissionEnum.REPORTS,
  //   routes: [
  //     {
  //       name: 'Inventory',
  //       route: ['reports', 'inventory'],
  //     },
  //     {
  //       name: 'Pricing',
  //       route: ['reports', 'pricing'],
  //     },
  //     {
  //       name: 'Promotions',
  //       route: ['reports', 'promotions'],
  //     },
  //   ],
  // },
  {
    section: 'Settings',
    permissionId: PermissionEnum.SETTINGS,
    routes: [
      // {
      //   name: 'Users',
      //   route: ['settings', 'users', 'list'],
      // },
      // {
      //   name: 'Roles',
      //   route: ['settings', 'roles', 'list'],
      // },
      {
        name: 'Settings',
        route: ['settings', 'store'],
      },
    ],
  },
];
