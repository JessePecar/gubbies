import {
  Component,
  ElementRef,
  inject,
  input,
  signal,
  ViewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NavbarService } from '../../services/navbar.service';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../button.component';

@Component({
  selector: 'app-navigation-dropdownv2',
  imports: [MatIconModule, RouterLink, ButtonComponent],
  template: `
    <div>
      <app-button (click)="toggleMenu()">
        <div class="w-full flex justify-between">
          <ng-content select="[menuItem]" />
          @if (showArrow()) {
            <mat-icon
              [class]="
                'transition duration-200 ' +
                (showMenu() ? 'rotate-180' : 'rotate-0')
              "
              fontIcon="keyboard_arrow_down" />
          }
        </div>
      </app-button>
      <!-- Drop down menu -->
      <div
        #menu
        (blur)="toggleMenu()"
        style="max-height: 0px;"
        class="w-full transition-all duration-200 overflow-hidden pl-1">
        <div
          class="flex flex-col border-t border-stone-800 pt-1 divide-y divide-stone-800 w-full">
          @for (opt of dropdownOptions(); track $index) {
            <a
              [routerLink]="opt.route"
              class="w-full hover:bg-stone-800 rounded-sm p-1 cursor-pointer"
              >{{ opt.linkTitle }}</a
            >
          }
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class NavigationDropdownComponentV2 {
  @ViewChild('menu')
  menu!: ElementRef<HTMLDivElement>;

  navbarService?: NavbarService = undefined;

  constructor() {
    this.navbarService = inject(NavbarService);
  }

  dropdownOptions = input.required<{ linkTitle: string; route: string }[]>();

  showArrow = input<boolean>(true);

  dropdownName = input<string>('');

  showMenu = signal<boolean>(false);

  toggleMenu() {
    const name = this.dropdownName();
    this.showMenu.set(!this.showMenu());
    this.showMenu()
      ? (this.menu.nativeElement.style.maxHeight = '100px')
      : (this.menu.nativeElement.style.maxHeight = '0px');

    if (this.showMenu()) {
      this.navbarService?.tiggerEvent(name);
    }
  }
}
