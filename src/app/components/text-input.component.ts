import { Component, input, output, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [],
  template: `
  <div class="text-white flex flex-col">
    <label>{{label()}}</label>
    <input
      class="rounded-t-lg shadow-lg p-2 border-b-1 border-gray-600 focus:border-gray-200 bg-black outline-none"
      [type]="inputProps()?.type ?? 'text'"
      [value]="value()"
      [placeholder]="inputProps()?.placeholder ?? ''"
      (change)="handleChange($event)"
      >
  </div>
  `,
  providers: [{provide: NG_VALUE_ACCESSOR, multi: true, useExisting: TextInputComponent}]
})
  
export class TextInputComponent implements ControlValueAccessor {
  
  //
  // Implementing ControlValueAccessor
  //
  writeValue(value: string | number | null): void {
    this.value.set(value);
  }

  registerOnChange(onChange: (value: string | number | null) => void): void {
    this.onChange = onChange;
  }

  registerOnTouched(fn: any): void {
    // This will be implemented precisely when I intend to
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  isDisabled = signal<boolean>(false);
  value = signal<string | number | null>(null);
  onChange = (value: string | number | null) => {};


  inputProps = input<Partial<HTMLInputElement>>();
  formControlName = input<string | number | null>(null);
  label = input<string | undefined>(undefined);
  
  onUnfocus = output<string>();

  handleChange(event: Event) {
    const inputElement = event.currentTarget as HTMLInputElement;
    const inputValue = inputElement.value;
    this.onChange(inputValue);
  }
}
