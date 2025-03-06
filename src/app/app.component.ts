import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserInfoService } from './services';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatIconModule],
  template: `
    <main class="bg-stone-800 h-full">
      <router-outlet />
    </main>
  `,
})
export class AppComponent implements OnInit {
  userInfoService!: UserInfoService;
  isLoading = signal<boolean>(true);
  title = 'Gubbies';

  ngOnInit(): void {}

  constructor() {
    this.userInfoService = inject(UserInfoService);
  }
}
