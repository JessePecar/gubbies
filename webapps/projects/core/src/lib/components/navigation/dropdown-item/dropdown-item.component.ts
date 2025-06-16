import { Component, inject, input } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { DropdownItem } from './dropdown-item.types';

@Component({
  selector: 'app-dropdown-item',
  imports: [RouterLinkActive],
  template: `
    @if (option(); as option) {
      <div>
        <div class="w-full mt-1">
          <a
            (click)="onRouteClicked()"
            routerLinkActive="bg-primary-blue-opaque hover:rounded-t-sm hover:rounded-b-none rounded-sm"
            class="hover:border-primary-green hover:bg-primary-green-opaque rounded-t-sm transition duration-300 border-b-1 border-transparent text-stone-800 block w-full p-1 pl-3 text-[0.85rem]"
            >{{ option.name }}</a
          >
        </div>
      </div>
    }
  `,
  styles: ``,
})
export class DropdownItemComponent {
  router = inject(Router);
  option = input.required<DropdownItem>();

  onRouteClicked() {
    this.router.navigate(this.option().route);
  }
}
