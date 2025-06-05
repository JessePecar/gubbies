import { adjustmentsGuard } from '@/bns-ui/inventory/adjustments/adjustments.guard';
import { AdjustmentsComponent } from '@/bns-ui/inventory/adjustments/adjustments.component';
import {
  AdjustmentsListPage,
  CreateAdjustmentPage,
} from '@/bns-ui/inventory/adjustments/pages';
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
