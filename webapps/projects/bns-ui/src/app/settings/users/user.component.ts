import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user',
  imports: [RouterOutlet],
  template: `
    <div class="h-full w-full">
      <router-outlet />
    </div>
  `,
  styles: ``,
})
export class UserComponent {}
