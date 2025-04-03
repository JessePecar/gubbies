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
import { ProfileNavItemComponent } from './profile-nav-item.component';
import { Router } from '@angular/router';
import { UserInfoService } from '../../services';
import { SettingsNavItemComponent } from './settings-nav-item.component';
import { ButtonComponent } from '@/components/buttons';

@Component({
  selector: 'app-navigation-bar',
  imports: [
    MatIconModule,
    InventoryNavItemComponent,
    ReportsNavItemComponent,
    PricingNavItemComponent,
    PromotionNavItemComponent,
    ProfileNavItemComponent,
    ButtonComponent,
    SettingsNavItemComponent,
  ],
  template: `
    <nav class="w-full mx-auto px-4 md:px-6 lg:px-8 z-50">
      <div
        #nav_menu
        id="navMenu"
        class="h-full w-12 fixed top-0 left-0 bg-stone-900 transition-all duration-100 p-1">
        <div class="flex justify-between pr-4 pb-1 border-b border-stone-800">
          <button
            (click)="toggleMenu()"
            type="button"
            class="text-grey-200 hover:bg-stone-800 rounded-lg p-1 flex items-center justify-center ">
            <mat-icon menuItem fontIcon="menu" />
          </button>
          @if (menuExpanded()) {
            <div
              class="flex-none focus:outline-none focus:opacity-80 "
              href="#"
              aria-label="GubbiesLogo">
              <img
                alt="Gubbies"
                class="h-8 min-w-16 "
                src="../../assets/Gubbies.PNG" />
            </div>
          }
        </div>
        @if (menuExpanded()) {
          <div class="h-full p-2 pl-0 mt-4 flex flex-col justify-between">
            <div
              class="space-y-4 flex flex-col overflow-y-auto overflow-x-hidden">
              <app-inventory-nav-item />

              <app-reports-nav-item />

              <app-pricing-nav-item />

              <app-promotion-nav-item />

              <app-settings-nav-item />
            </div>
            <div class="absolute left-0 bottom-0 w-full py-1 px-2 h-24">
              <div class="flex flex-col justify-between h-full w-full py-2">
                <app-profile-nav-item />

                <app-button
                  contentType="full"
                  buttonType="default"
                  (click)="logout()">
                  <div class="py-1 flex space-x-2">
                    <mat-icon fontIcon="logout" />
                    <p>Logout</p>
                  </div>
                </app-button>
              </div>
            </div>
          </div>
        }
      </div>
    </nav>
  `,
})
export class NavigationBarComponent implements OnInit {
  userInfoService: UserInfoService;
  router: Router;

  @ViewChild('nav_menu')
  navMenu!: ElementRef<HTMLDivElement>;

  menuExpanded = signal<boolean>(false);

  constructor(userInfoService: UserInfoService, router: Router) {
    this.userInfoService = userInfoService;
    this.router = router;
  }

  ngOnInit(): void {
    this.menuExpanded.set(false);
  }

  toggleMenu() {
    this.menuExpanded() ? this.onMenuHidden() : this.onMenuShown();
  }

  onMenuShown() {
    this.navMenu.nativeElement.classList.add('w-[12rem]');
    this.menuExpanded.set(true);
  }

  onMenuHidden() {
    this.navMenu.nativeElement.classList.remove('w-[12rem]');
    this.menuExpanded.set(false);
  }

  logout() {
    this.userInfoService.setUser(undefined, undefined);
    this.router.navigate(['login']);
  }
}
