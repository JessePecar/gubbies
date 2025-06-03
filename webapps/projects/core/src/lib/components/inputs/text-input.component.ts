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
      <div class="text-stone-800 flex flex-col">
        @if (inputProps()?.isTextArea) {
          <textarea
            (blur)="onUnfocused()"
            [id]="label() + '_input'"
            class="rounded-lg p-2 border-1 border-primary-dark focus:border-primary-green bg-primary outline-none input-field max-h-64"
            [value]="value()"
            [required]="inputProps()?.required"
            (change)="handleChange($event)"
            placeholder=" "></textarea>
        } @else {
          <input
            (blur)="onUnfocused()"
            [id]="label() + '_input'"
            class="rounded-lg p-2 border-1 border-primary-dark focus:border-primary-green bg-primary outline-none input-field h-8 text-sm"
            [type]="inputProps()?.type ?? 'text'"
            [value]="value()"
            [required]="inputProps()?.required"
            (keyup)="handleChange($event)"
            [placeholder]="inputProps()?.placeholder ?? ' '" />
        }

        <div
          class="input-label pl-4 transition-all duration-100 ease-in order-[-1] flex text-sm">
          <label [for]="label() + '_input'">{{ label() }} </label>
          @if (inputProps()?.required) {
            <p class="opacity-50 text-red-700 font-bold pl-1">*</p>
          }
        </div>
      </div>
      <span class="absolute pl-1">
        @if (formItem()?.errors !== null && formItem()?.touched) {
          <p class="text-sm text-red-600">
            <small>{{ getErrors() }}</small>
          </p>
        }
      </span>
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
    this.onChange.emit = onChange;
  }

  registerOnTouched(onTouched: (touched: boolean) => void): void {
    this.onTouched = onTouched;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  getErrors() {
    const errors = this.formItem()?.errors;

    const errorList = errors
      ? Object.entries(errors).map(([_, value]) => value)
      : [];

    if (errorList.length > 1) {
      return `${errorList.length} errors have occured`;
    } else if (errorList.length === 1) {
      return errorList[0][0];
    } else {
      return 'Error';
    }
  }

  onUnfocused() {
    this.onTouched(true);
  }

  @ViewChild('input')
  input!: ElementRef<HTMLInputElement>;

  isDisabled = signal<boolean>(false);
  value = signal<string | number | null>(null);

  touched = signal<boolean>(false);

  onChange = output<string | null | number>();

  onTouched = (touched: boolean) => {
    this.touched.set(touched);
  };

  inputProps = input<Partial<HTMLInputElement> & { isTextArea?: boolean }>();
  label = input<string | undefined>(undefined);

  formItem = input<AbstractControl<any, any> | null>();

  handleUnfocus = output<string>();

  handleChange(event: Event) {
    const inputElement = event.currentTarget as HTMLInputElement;
    const inputValue = inputElement.value;
    this.onChange.emit(inputValue);
  }
}
