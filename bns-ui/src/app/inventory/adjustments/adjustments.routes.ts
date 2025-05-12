import { adjustmentsGuard } from '@/inventory/adjustments/adjustments.guard';
import { AdjustmentsComponent } from '@/inventory/adjustments/adjustments.component';
import {
  AdjustmentsListPage,
  CreateAdjustmentPage,
} from '@/inventory/adjustments/pages';
import { Routes } from '@angular/router';

export const adjustmentRoutes: Routes = [
  {
    path: 'adjustments',
    canActivate: [adjustmentsGuard],
    component: AdjustmentsComponent,
    children: [
      {
        path: 'list',
        component: AdjustmentsListPage,
      },
      {
        path: 'create',
        component: CreateAdjustmentPage,
      },
    ],
  },
];
