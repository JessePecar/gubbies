import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { GlobalAlertComponent } from '@/core/components/alert/global-alert.component';
import { UserInfoService } from '@/bns-ui/common/services';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatIconModule, GlobalAlertComponent],
  template: `
    <main class="bg-primary h-full">
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
