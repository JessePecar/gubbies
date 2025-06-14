import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<div class="bg-primary absolute top-0 bottom-0 left-0 right-0">
    <router-outlet></router-outlet>
  </div>`,
  styles: ``,
})
export class AppComponent {}
