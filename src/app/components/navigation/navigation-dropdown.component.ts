import { Component, ElementRef, inject, input, OnInit, signal, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NavbarService } from '../../services/NavbarService';

@Component({
  selector: 'app-navigation-dropdown',
  imports: [MatIconModule],
  template: `
  <div>
    <a class="cursor-pointer md:p-2 font-medium text-gray-200 focus:outline-none flex items-center" (click)="toggleMenu()">
      <ng-content />
      @if(showArrow()) { 
        <mat-icon fontIcon="keyboard_arrow_down"/>
      }
    </a>
    <!-- Drop down menu -->
    <div (blur)="toggleMenu()" id="dropdown-menu" [class]="showMenu() ? '' : 'hidden'">
      <div class="absolute w-full left-0 flex rounded-b-lg bg-stone-900 border border-stone-800 shadow-lg p-4 mt-7 border-t border-stone-800">
        <div class="flex space-x-8 w-full">
          <p>{{dropdownName()}} Option 1</p>
          <p>{{dropdownName()}} Option 2</p>
          <p>{{dropdownName()}} Option 3</p>
        </div>
      </div>
    </div>
  </div>
  `,
  styles: ``
})
export class NavigationDropdownComponent implements OnInit {
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

    if (this.showMenu()) { 
      console.log(`${this.dropdownName()} dropdown has menu set to ${this.showMenu()}`)
      this.navbarService?.tiggerEvent(name);
    }
  }

  subscribeToEvent() {
    this.navbarService?.drodownEvent.subscribe(triggerName => {
      if (triggerName !== this.dropdownName()) { 
        console.log(`Found that ${triggerName} was not equal to ${this.dropdownName()}`);
        this.showMenu.set(false);
      }
    });
  }

}
