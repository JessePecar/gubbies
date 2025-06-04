import { Component } from '@angular/core';
import { LoginComponent } from './login';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LoginComponent],
  template: `<login />`,
  styles: ``,
})
export class AppComponent {}
