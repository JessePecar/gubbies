import { Component, inject, signal } from '@angular/core';
import { AdjustmentsListService } from './adjustment-list.service';
import { ButtonComponent } from '@/core/components/buttons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adjustments-list',
  imports: [ButtonComponent],
  template: `@if (isLoading) {
    } @else {
      <div class="h-full w-full p-4">
        <app-button
          (handleClick)="onCreate()"
          buttonType="raised"
          text="Create Adjustment" />
        <!-- Adjustment Table -->
      </div>
    } `,
  styles: ``,
})
export class AdjustmentsListPage {
  adjustmentService = inject(AdjustmentsListService);
  router = inject(Router);

  adjustment = signal<any | undefined>(undefined);
  isLoading = true;

  onCreate() {
    this.router.navigate(['inventory/adjustments/create']);
  }

  getAdjustments() {
    this.adjustmentService.getAdjustments().subscribe(res => {
      if (res) {
        this.adjustment.set(res);
      }

      this.isLoading = false;
    });
  }

  constructor() {
    this.getAdjustments();
  }
}
