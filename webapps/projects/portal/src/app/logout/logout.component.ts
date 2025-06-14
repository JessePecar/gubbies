import { Component, effect, inject, input, untracked } from '@angular/core';
import { LoaderComponent } from '@/core/components/loader/loader.component';
import { LogoutService } from '@/portal/logout/logout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  imports: [LoaderComponent],
  template: ` <loader /> `,
})
export class LogoutComponent {
  private readonly logoutService = inject(LogoutService);
  private readonly router = inject(Router);
  sessionId = input<string>();

  constructor() {
    effect(() => {
      const sessionId = this.sessionId();
      untracked(() => {
        if (sessionId) {
          this.logoutService.invalidateSession(sessionId).subscribe(() => {
            this.router.navigate([''])
          });
        }
      });
    });
  }
}
