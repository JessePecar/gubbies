import {
  Component,
  ElementRef,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { InventoryNavItemComponent } from './inventory-nav-item.component';
import { ReportsNavItemComponent } from './reports-nav-item.component';
import { PricingNavItemComponent } from './pricing-nav-item.component';
import { PromotionNavItemComponent } from './promotion-nav-item.component';
import { Router } from '@angular/router';
import { UserInfoService } from '@/services';
import { SettingsNavItemComponent } from './settings-nav-item.component';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-navigation-bar',
  imports: [
    MatIconModule,
    InventoryNavItemComponent,
    ReportsNavItemComponent,
    PricingNavItemComponent,
    PromotionNavItemComponent,
    SettingsNavItemComponent,
    UpperCasePipe,
  ],
  template: `
    <nav class="bg-primary p-1">
      <div class="flex justify-between pr-4 pb-1">
        <div
          class="flex w-full text-lg font-bold items-center justify-center focus:outline-none focus:opacity-80 text-stone-800"
          href="#"
          aria-label="GubbiesLogo">
          <h1 class="text-secondary-blue">{{ 'Box & Shelf' | uppercase }}</h1>
        </div>
      </div>
      <div class="h-full p-2 pl-0 mt-4 flex flex-col justify-start">
        <div class="space-y-4 flex flex-col overflow-y-auto overflow-x-hidden">
          <app-inventory-nav-item />

          <app-reports-nav-item />

          <app-pricing-nav-item />

          <app-promotion-nav-item />

          <app-settings-nav-item />
        </div>
      </div>
    </nav>
  `,
})
export class NavigationBarComponent {
  userInfoService: UserInfoService;
  router: Router;

  @ViewChild('nav_menu')
  navMenu!: ElementRef<HTMLDivElement>;

  constructor(userInfoService: UserInfoService, router: Router) {
    this.userInfoService = userInfoService;
    this.router = router;
  }
}
