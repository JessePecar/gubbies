import { Routes } from '@angular/router';
import { CategoryCreatePage } from './pages/create';
import { CategoryListPage } from './pages/list';

export const categoriesRoutes: Routes = [
  {
    path: 'create',
    component: CategoryCreatePage,
  },
  {
    path: 'list',
    component: CategoryListPage,
  },
];
