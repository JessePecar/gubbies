import {
  AdjustmentSettingsComponent,
  PromotionSettingsComponent,
  StorePage,
  StoreSettingsComponent,
} from '@/settings/store/pages/store';
import { Routes } from '@angular/router';

export const storeRoutes: Routes = [
  {
    path: '',
    component: StorePage,
    children: [
      {
        path: 'store-settings',
        component: StoreSettingsComponent,
      },
      {
        path: 'adjustment-settings',
        component: AdjustmentSettingsComponent,
      },
      {
        path: 'promotion-settings',
        component: PromotionSettingsComponent,
      },
    ],
  },
];
