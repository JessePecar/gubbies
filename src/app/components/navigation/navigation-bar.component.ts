import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NavigationDropdownComponent } from "./navigation-dropdown.component";

@Component({
  selector: 'app-navigation-bar',
  imports: [MatIconModule, NavigationDropdownComponent],
  template: `
  <nav class="max-w-[85rem] w-full mx-auto px-4 md:px-6 lg:px-8">
    <div class="relative md:flex md:items-center">
      <div class="flex items-center justify-between">
        <a class="flex-none focus:outline-none focus:opacity-80" href="#" aria-label="GubbiesLogo">
          <img alt="Gubbies" class="h-16" src="../../assets/Gubbies.PNG" />
        </a>
        <!-- Hamburger button -->
        <div class="md:hidden">
          <button type="button" class="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-neutral-700 dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10" id="hs-navbar-basic-usage-collapse" aria-expanded="false" aria-controls="hs-navbar-basic-usage" aria-label="Toggle navigation" data-hs-collapse="#hs-navbar-basic-usage">
            <svg class="hs-collapse-open:hidden shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="18" y2="18"/></svg>
            <svg class="hs-collapse-open:block hidden shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
      </div>

      <div id="hs-navbar-basic-usage" class="hidden hs-collapse overflow-hidden transition-all duration-300 basis-full grow md:block" aria-labelledby="hs-navbar-basic-usage-collapse">
        <div class="flex flex-col gap-y-3 md:gap-y-0 mt-5 md:flex-row md:items-center md:justify-end md:mt-0 md:ps-5">
          <app-navigation-dropdown dropdownName="inventory">
            Inventory
          </app-navigation-dropdown>

          <app-navigation-dropdown dropdownName="reports">
            Reports
          </app-navigation-dropdown>

          <app-navigation-dropdown dropdownName="pricing">
            Pricing
          </app-navigation-dropdown>

          <app-navigation-dropdown dropdownName="promotions">
            Promotions
          </app-navigation-dropdown>

          <app-navigation-dropdown dropdownName="settings">
            Settings
          </app-navigation-dropdown>
          
          <app-navigation-dropdown dropdownName="profile" [showArrow]="false">
            <mat-icon fontIcon="account_circle"/>
          </app-navigation-dropdown>
        </div>
      </div>
    </div>
  </nav>
  `
})
export class NavigationBarComponent {

}
