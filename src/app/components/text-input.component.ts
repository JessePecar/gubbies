import {
  Component,
  ElementRef,
  input,
  output,
  signal,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [],
  template: `
    <div class="text-gray-200 flex flex-col">
      <input
        [id]="label() + '_input'"
        class="rounded-lg shadow-lg p-2 border-1 border-stone-600 focus:border-gray-200 bg-stone-900 outline-none input-field"
        [type]="inputProps()?.type ?? 'text'"
        [value]="value()"
        [required]="true"
        (change)="handleChange($event)" />
      <div
        class="input-label pl-4 transition-all duration-150 ease-in order-[-1] flex">
        <label [for]="label() + '_input'">{{ label() }} </label>
        @if (inputProps()?.required) {
          <p class="opacity-50  text-red-700 font-bold pl-1">*</p>
        }
      </div>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: TextInputComponent,
    },
  ],
  styles: `
    .input-label {
      transform: translateY(2.1rem);
      pointer-events: none;
    }

    .input-field:focus + .input-label,
    .input-field:valid ~ .input-label {
      transform: translateY(-2px) translateX(-1rem);
    }
  `,
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

  registerOnTouched(): void {
    // This will be implemented precisely when I intend to
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  @ViewChild('input')
  input!: ElementRef<HTMLInputElement>;

  isDisabled = signal<boolean>(false);
  value = signal<string | number | null>(null);
  onChange = (_value: string | number | null) => {
    // On Change
  };

  inputProps = input<Partial<HTMLInputElement>>();
  formControlName = input<string | number | null>(null);
  label = input<string | undefined>(undefined);

  handleUnfocus = output<string>();

  handleChange(event: Event) {
    const inputElement = event.currentTarget as HTMLInputElement;
    const inputValue = inputElement.value;
    this.onChange(inputValue);
  }
}
