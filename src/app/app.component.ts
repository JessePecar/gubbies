import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserInfoService } from './services';
import { MatIconModule } from '@angular/material/icon';
import { GlobalAlertComponent } from './components/alert/global-alert.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatIconModule, GlobalAlertComponent],
  template: `
    <main class="bg-stone-800 h-full">
      <router-outlet />
      <app-global-alert />
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
