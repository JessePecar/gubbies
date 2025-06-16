import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { UpperCasePipe } from '@angular/common';
import { navigationOptions } from '@/bns-ui/components/navigation/navigation-bar.constants';
import { NavigationDropdownComponent } from "./navigation-dropdown.component";

@Component({
  selector: 'app-navigation-bar',
  imports: [
    MatIconModule, 
    UpperCasePipe,
    NavigationDropdownComponent
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
          <!-- TODO: Change to using the navigation bar constants to build out the nav items -->
          @for (option of navBarOptions; track $index) {
            <app-navigation-dropdown
              [dropdownOptions]="option.routes"
              [dropdownPermission]="option.permissionId">
              <p>{{option.section}}</p>
            </app-navigation-dropdown>
          }
        </div>
      </div>
    </nav>
  `,
})
export class NavigationBarComponent {
  @ViewChild('nav_menu')
  navMenu!: ElementRef<HTMLDivElement>;

  navBarOptions = navigationOptions;
}
