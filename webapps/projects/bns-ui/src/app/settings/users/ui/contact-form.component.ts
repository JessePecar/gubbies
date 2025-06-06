import { Component, inject } from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from '@/core/components';
import { UserStore } from '@/settings/users/store';

@Component({
  selector: 'contact-form',
  imports: [TextInputComponent, ReactiveFormsModule],
  template: `<div [formGroup]="userStore.form">
    <form formGroupName="primaryPhone" class="mb-4">
      <p class="text-lg mb-1">Contact Information</p>
      <div class="grid grid-cols-4 gap-2">
        <app-text-input
          [inputProps]="{ required: true }"
          formControlName="rawDigits"
          label="Primary Phone" />
      </div>
    </form>
  </div>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: ContactFormComponent,
    },
  ],
})
export class ContactFormComponent {
  userStore = inject(UserStore);
}
