import { Component, DestroyRef, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { noop } from 'rxjs';

@Component({
  selector: 'app-switch-input',
  imports: [ReactiveFormsModule],
  template: `
    <div class="flex space-x-4 p-1 items-center min-w-8">
      <label class="switch">
        <input
          class="switch-input"
          [id]="formControlName()"
          [formControl]="formControl"
          type="checkbox" />
        <span class="slider round"></span>
      </label>
      <p class="text-sm">{{ label() }}</p>
    </div>
  `,
  styleUrl: './switch-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: SwitchInputComponent,
    },
  ],
})
export class SwitchInputComponent {
  readonly formControl = new FormControl();
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  //
  // Implementing ControlValueAccessor
  //
  writeValue(value: boolean | null): void {
    this.formControl.patchValue(value, { emitEvent: false });
  }

  registerOnChange(onChange: (value: boolean | null) => void): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouch: () => void): void {
    this.onTouch = onTouch;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.formControl.disable() : this.formControl.enable();
  }

  constructor() {
    this.formControl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((checked: boolean) => {
        try {
          this.onChange(checked);
        } catch (err) {
          //Do nothing?
        }
      });
  }

  label = input<string>();
  formControlName = input<string>();

  disabled = signal<boolean>(false);
  touched = signal<boolean>(false);
  isChecked = signal<boolean>(false);

  onChange: (value: boolean | null) => void = noop;
  onTouch: () => void = noop;
  handleChange() {
    this.onChange(!this.isChecked());
  }
}
