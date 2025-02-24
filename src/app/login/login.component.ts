import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  template: `
    <div class="flex justify-center items-center h-full">
      <div class="bg-slate-700 rounded shadow-lg h-20 w-32">
        <div class="w-full flex justify-center p-4">
          <h1 class="logo text-lg font-bold">Gubbies</h1>
        </div>
      </div>
    </div>
  `,
  styles: `
    .logo {
      font-family: 'helvetica'
    }
  `,
})
export class LoginComponent {}
