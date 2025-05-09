import { Routes } from '@angular/router';
import { CategoryCreatePage } from './pages/create-category';
import { CategoryListPage } from './pages/list';
import {
  CategoryTableComponent,
  SubcategoryTableComponent,
  FamilyTableComponent,
} from '@/inventory/categories/ui';
import { CreatePage } from '@/inventory/categories/pages/create';

export const categoriesRoutes: Routes = [
  {
    path: 'create',
    component: CreatePage,
    children: [
      {
        path: '',
        redirectTo: 'category',
      },
      {
        path: 'category',
        component: CategoryCreatePage,
      },
      {
        path: 'subcategory',
        component: CategoryCreatePage,
      },
      {
        path: 'family',
        component: CategoryCreatePage,
      },
    ],
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
