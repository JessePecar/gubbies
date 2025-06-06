import { Component, DestroyRef, inject, input, signal } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { noop } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-checkbox',
  imports: [ReactiveFormsModule],
  template: `
    <div class="flex space-x-2 items-center">
      <input
        class="bg-transparent checked:bg-primary-green"
        [id]="formControlName()"
        [formControl]="formControl"
        type="checkbox" />
      <label [for]="formControlName()" class="text-xs cursor-pointer">
        {{ label() }}
      </label>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CheckboxComponent,
    },
  ],
  styleUrl: './input.scss',
})
export class CheckboxComponent implements ControlValueAccessor {
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
