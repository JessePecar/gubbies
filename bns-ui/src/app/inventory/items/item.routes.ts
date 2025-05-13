import { ItemsPage, itemsGuard } from '@/inventory/items';
import {
  ItemListPage,
  ItemCreatePage,
  ItemDetailsPage,
  itemCreateRoutes,
} from '@/inventory/items/pages';
import { Routes } from '@angular/router';

export const itemRoutes: Routes = [
  {
    path: 'items',
    component: ItemsPage,
    canActivate: [itemsGuard],
    children: [
      {
        path: 'list',
        component: ItemListPage,
      },
      {
        path: 'create',
        component: ItemCreatePage,
        children: itemCreateRoutes,
      },
      {
        path: 'details',
        component: ItemDetailsPage,
      },
    ],
  },
];
