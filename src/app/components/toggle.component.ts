import { Component, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-toggle',
  imports: [],
  template: `
    <div class="flex justify-center items-center">
      <label class="toggle relative inline-block w-8 h-4">
        <input
          [checked]="value()"
          [disabled]="isDisabled()"
          (change)="handleChange($event)"
          type="checkbox"
          id="toggle-switch" />
        <span
          class="slider absolute right-0 left-0 top-0 bottom-0 cursor-pointer transition-all duration-150 rounded-full bg-primary-dark outline outline-stone-800"></span>
      </label>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: ToggleComponent,
    },
  ],
})
export class ToggleComponent implements ControlValueAccessor {
  value = signal<boolean>(false);
  isDisabled = signal<boolean>(false);

  formControlName = input<string | number | null>(null);

  onChange = (_value: boolean) => {
    // On Change
  };

  //
  // Implementing ControlValueAccessor
  //
  writeValue(value: boolean): void {
    this.value.set(value);
  }

  registerOnChange(onChange: (value: boolean) => void): void {
    this.onChange = onChange;
  }

  registerOnTouched(fn: any): void {
    // This will be implemented precisely when I intend to
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  handleChange(event: Event) {
    const inputElement = event.currentTarget as HTMLInputElement;
    const inputValue = inputElement.checked;
    this.onChange(inputValue);
  }
}
