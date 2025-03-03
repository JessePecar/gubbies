import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserInfoService } from './services';
import { MatIconModule } from '@angular/material/icon';
import { from } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatIconModule],
  template: `
    <main class="bg-stone-800 h-full">
      @if (isLoading()) {
        <div
          class="flex h-full w-full justify-center items-center text-gray-200">
          <mat-icon
            class="animate-spin text-gray-200"
            color="#CCCCCC"
            fontIcon="progress_activity" />
        </div>
      } @else {
        <router-outlet />
      }
    </main>
  `,
})
export class AppComponent implements OnInit {
  userInfoService!: UserInfoService;
  isLoading = signal<boolean>(true);
  title = 'Gubbies';

  ngOnInit(): void {
    from(this.userInfoService.setupStore()).subscribe(() => {
      this.isLoading.set(true);
    });
  }

  constructor() {
    this.userInfoService = inject(UserInfoService);
  }
}
