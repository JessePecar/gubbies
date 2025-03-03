import {
  Component,
  ElementRef,
  inject,
  input,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NavbarService } from '../../services/navbar.service';

@Component({
  selector: 'app-navigation-dropdown',
  imports: [MatIconModule],
  template: `
    <div>
      <a
        class="cursor-pointer p-2 font-medium text-gray-200 focus:outline-none flex justify-between items-center hover:bg-stone-800 rounded"
        (click)="toggleMenu()">
        <ng-content select="[menuItem]" />
        @if (showArrow()) {
          <mat-icon fontIcon="keyboard_arrow_right" />
        }
      </a>
      <!-- Drop down menu -->
      <div
        #menu
        (blur)="toggleMenu()"
        class="w-96 hidden delay-150 transition-all duration-200">
        <div
          class="mt-[-42px] ml-33 absolute flex rounded-r-lg bg-stone-900 border border-stone-800 shadow-lg p-4 ml-1 border-t border-stone-800">
          <ng-content select="[options]" />
        </div>
      </div>
    </div>
  `,
  styles: ``,
})
export class NavigationDropdownComponent implements OnInit {
  @ViewChild('menu')
  menu!: ElementRef<HTMLDivElement>;

  navbarService?: NavbarService = undefined;

  constructor() {
    this.navbarService = inject(NavbarService);
  }

  ngOnInit(): void {
    this.subscribeToEvent();
  }

  showArrow = input<boolean>(true);

  dropdownName = input<string>('');

  showMenu = signal<boolean>(false);

  toggleMenu() {
    const name = this.dropdownName();
    this.showMenu.set(!this.showMenu());
    this.showMenu()
      ? this.menu.nativeElement.classList.remove('hidden')
      : this.menu.nativeElement.classList.add('hidden', 'w-0');

    if (this.showMenu()) {
      this.navbarService?.tiggerEvent(name);
    }
  }

  subscribeToEvent() {
    this.navbarService?.drodownEvent.subscribe(triggerName => {
      if (triggerName !== this.dropdownName()) {
        this.showMenu.set(false);
        this.menu.nativeElement.classList.add('hidden');
      }
    });
  }
}
