import { Component } from '@angular/core';
import { LoginComponent } from './login';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LoginComponent],
  template: `<div class="bg-primary absolute top-0 bottom-0 left-0 right-0">
    <login />
  </div>`,
  styles: ``,
})
export class AppComponent {}
