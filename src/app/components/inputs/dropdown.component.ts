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
  id: number | string;
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
        class="w-full h-10 rounded-lg border border-stone-600 p-1">
        @for (option of options(); track $index) {
          <option
            [value]="option.id"
            matRipple
            matRippleColor="#44444444"
            class="">
            {{ option.name }}
          </option>
        }
      </select>
    </div>
  `,
  styles: ``,
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
    var selectedOption = this.options()?.find(opt => opt.name === inputValue);
    this.onChange(selectedOption ?? null);
  }

  onChange: (value: DropdownOption | null) => void = noop;
  onTouched: (touched: boolean) => void = noop;

  //
  // Implementing ControlValueAccessor
  //
  writeValue(value: DropdownOption | null): void {
    this.value.set(value);
  }

  registerOnChange(onChange: (value: DropdownOption | null) => void): void {
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
