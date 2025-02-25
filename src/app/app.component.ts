import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <main class="bg-stone-800 h-full">
      <router-outlet />
    </main>
  `,
})
export class AppComponent {
  title = 'gubbies';
}
