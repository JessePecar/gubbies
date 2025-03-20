import {
  Component,
  ElementRef,
  input,
  output,
  signal,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { noop } from 'rxjs';

export type DropdownOption = {
  id: number;
  name: string;
};

@Component({
  selector: 'app-dropdown',
  imports: [MatIconModule, MatRippleModule, ReactiveFormsModule],
  template: `
    <div>
      <div class="pl-1">
        <label [for]="label() + '_input'">{{ label() }} </label>
      </div>
      <select
        [value]="value()?.id ?? 0"
        (change)="handleChange($event)"
        class="minimal block sm:text-sm w-full h-10 rounded-lg border border-stone-600 p-1">
        @for (option of options(); track $index) {
          <option
            class="bg-stone-900 text-stone-200 h-8"
            [value]="option.id"
            matRipple
            matRippleColor="#44444444">
            <span class="h-8">
              {{ option.name }}
            </span>
          </option>
        }
      </select>
    </div>
  `,
  styles: `
    select {
      margin: 0;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      -webkit-appearance: none;
      -moz-appearance: none;
    }

    select.minimal {
      background-image:
        linear-gradient(45deg, transparent 50%, var(--color-stone-400) 50%),
        linear-gradient(135deg, var(--color-stone-400) 50%, transparent 50%),
        linear-gradient(
          to right,
          var(--color-stone-400),
          var(--color-stone-400)
        );
      background-position:
        calc(100% - 20px) calc(1em + 2px),
        calc(100% - 15px) calc(1em + 2px),
        calc(100% - 2.5em) 0.5em;
      background-size:
        5px 5px,
        5px 5px,
        1px 1.5em;
      background-repeat: no-repeat;
    }
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: DropdownComponent,
    },
  ],
})
export class DropdownComponent implements ControlValueAccessor {
  @ViewChild('input')
  input!: ElementRef<HTMLInputElement>;

  isDisabled = signal<boolean>(false);
  value = signal<DropdownOption | null>(null);

  options = input.required<DropdownOption[] | null>();
  inputProps = input<Partial<HTMLInputElement>>();
  label = input<string | undefined>(undefined);

  handleUnfocus = output<string>();

  handleChange(event: Event) {
    const inputElement = event.currentTarget as HTMLInputElement;
    const inputValue = inputElement.value;
    console.log(inputValue);
    this.onChange(parseInt(inputValue) ?? null);
  }

  onChange: (value: number | null) => void = noop;
  onTouched: (touched: boolean) => void = noop;

  //
  // Implementing ControlValueAccessor
  //
  writeValue(value: DropdownOption | null): void {
    this.value.set(value);
  }

  registerOnChange(onChange: (value: number | null) => void): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: (touched: boolean) => void): void {
    // This will be implemented precisely when I intend to
    this.onTouched = onTouched;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }
}
