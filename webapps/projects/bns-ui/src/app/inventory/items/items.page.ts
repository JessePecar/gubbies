import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-items',
  imports: [RouterOutlet],
  template: ` <router-outlet></router-outlet> `,
  styles: ``,
})
export class ItemsPage {}
