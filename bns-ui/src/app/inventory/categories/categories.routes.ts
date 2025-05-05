import { Routes } from '@angular/router';
import { CategoryCreatePage } from './pages/create';
import { CategoryListPage } from './pages/list';
import {
  CategoryTableComponent,
  SubcategoryTableComponent,
  FamilyTableComponent,
} from '@/inventory/categories/ui';

export const categoriesRoutes: Routes = [
  {
    path: 'create',
    component: CategoryCreatePage,
  },
  {
    path: '',
    component: CategoryListPage,
    children: [
      {
        path: 'category-list',
        component: CategoryTableComponent,
        data: {
          title: 'Categories',
        },
      },
      {
        path: 'subcategory-list',
        component: SubcategoryTableComponent,
        data: {
          title: 'Subcategories',
        },
      },
      {
        path: 'family-list',
        component: FamilyTableComponent,
        data: {
          title: 'Families',
        },
      },
    ],
  },
];
