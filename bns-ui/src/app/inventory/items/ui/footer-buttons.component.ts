import { ButtonComponent } from '@/components/buttons';
import { Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'footer-buttons',
  imports: [ButtonComponent],
  template: `
    <div class="w-full flex justify-end space-x-4 pt-4">
      <app-button text="Cancel" buttonType="text" (handleClick)="onCancel()" />
      <app-button
        [disabled]="!canSubmit"
        text="Submit"
        buttonType="raised"
        (handleClick)="onSubmit()" />
    </div>
  `,
  styles: ``,
})
export class FooterButtonsComponent {
  canSubmit = input<boolean>(true);
  nextStep = input.required<string>();
  router = inject(Router);

  onCancel() {}

  onSubmit() {
    if (this.canSubmit()) {
      this.router.navigate(['inventory', 'items', 'create', this.nextStep()]);
    }
  }
}
