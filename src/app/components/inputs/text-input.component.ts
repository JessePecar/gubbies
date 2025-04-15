import {
  Component,
  ElementRef,
  input,
  output,
  signal,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [],
  template: `
    <span>
      <div class="text-primary flex flex-col">
        @if (inputProps()?.isTextArea) {
          <textarea
            [id]="label() + '_input'"
            class="rounded-lg shadow p-2 border-1 border-stone-400 focus:border-primary-green bg-primary outline-none input-field max-h-64"
            [value]="value()"
            [required]="inputProps()?.required"
            (change)="handleChange($event)"
            placeholder=" "></textarea>
        } @else {
          <input
            [id]="label() + '_input'"
            class="rounded-lg shadow p-2 border-1 border-stone-400 focus:border-primary-green bg-primary outline-none input-field h-8"
            [type]="inputProps()?.type ?? 'text'"
            [value]="value()"
            [required]="inputProps()?.required"
            (change)="handleChange($event)"
            placeholder=" " />
        }

        <div
          class="input-label pl-4 transition-all duration-100 ease-in order-[-1] flex">
          <label [for]="label() + '_input'">{{ label() }} </label>
          @if (inputProps()?.required) {
            <p class="opacity-50 text-red-700 font-bold pl-1">*</p>
          }
        </div>
      </div>
    </span>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: TextInputComponent,
    },
  ],
  styleUrl: './input.scss',
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

  registerOnTouched(onTouched: (touched: boolean) => void): void {
    this.onTouched = onTouched;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  getErrorKeys() {
    // Deconstruct, but default to undefined
    var { errors } = this.formItem() ?? { errors: undefined };

    // Grab the keys that are in the errors to be added to the list of errors displayed
    if (errors !== null && errors !== undefined) {
      return Object.keys(errors);
    }

    return [] as string[];
  }

  getError(errorKey: string) {
    // Deconstruct, but default to undefined
    var { errors } = this.formItem() ?? { errors: undefined };

    // Grab the keys that are in the errors to be added to the list of errors displayed
    if (errors !== null && errors !== undefined) {
      return errors[errorKey] ?? '';
    }

    return '';
  }

  @ViewChild('input')
  input!: ElementRef<HTMLInputElement>;

  isDisabled = signal<boolean>(false);
  value = signal<string | number | null>(null);

  touched = signal<boolean>(false);

  onChange = (_value: string | number | null) => {
    // On Change
  };

  onTouched = (touched: boolean) => {
    this.touched.set(touched);
  };

  inputProps = input<Partial<HTMLInputElement> & { isTextArea?: boolean }>();
  label = input<string | undefined>(undefined);

  formItem = input<AbstractControl<never, never> | null>();

  handleUnfocus = output<string>();

  handleChange(event: Event) {
    const inputElement = event.currentTarget as HTMLInputElement;
    const inputValue = inputElement.value;
    this.onChange(inputValue);
  }
}
