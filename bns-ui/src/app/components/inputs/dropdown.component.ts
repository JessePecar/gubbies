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

export interface DropdownOption {
  id: number | string;
  name: string;
}

@Component({
  selector: 'app-dropdown',
  imports: [MatIconModule, MatRippleModule, ReactiveFormsModule],
  template: `
    <div class="mb-[2px] pl-2 mt-[-2px] text-sm flex space-x-1">
      <p>{{ label() }}</p>
      @if (isRequired()) {
        <p class="opacity-50 text-red-700 font-bold pl-1">*</p>
      }
    </div>
    <div #dropdown class="dropdown " tabindex="1">
      <i class="db2" tabindex="1"></i>
      <a
        matRipple
        [matRippleCentered]="true"
        matRippleColor="#44444444"
        class="dropbtn w-full flex items-center justify-between p-1 h-8 w-full rounded-lg border border-primary-dark bg-primary pl-4">
        {{ getSelectedOption() ?? '--' }}
        <mat-icon fontIcon="arrow_drop_down" />
      </a>
      <div class="dropdown-content bg-primary text-stone-800 shadow-lg">
        @for (option of options(); track $index) {
          <a
            matRipple
            matRippleColor="#44444444"
            class="dropdown-item cursor-pointer"
            (click)="handleChange(option)">
            <span class="flex space-x-8 items-center">
              {{ option.name }}
            </span>
          </a>
        }
      </div>
    </div>
  `,
  styleUrl: '../buttons/context/context-button.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: DropdownComponent,
    },
  ],
})
export class DropdownComponent implements ControlValueAccessor {
  @ViewChild('dropdown')
  dropdown!: ElementRef<HTMLDivElement>;

  isDisabled = signal<boolean>(false);
  value = signal<number | string | null>(null);

  options = input.required<DropdownOption[] | null>();
  label = input<string | undefined>(undefined);
  isRequired = input<boolean>(false);

  handleUnfocus = output<number | string | null>();

  handleChange(selectedOption: DropdownOption) {
    const inputValue = selectedOption.id;

    this.onChange(inputValue);
    this.writeValue(inputValue);
    // Closes the dropdown
    this.dropdown.nativeElement.blur();
    this.handleUnfocus.emit(this.value());
  }

  onChange: (value: number | string | null) => void = noop;
  onTouched: (touched: boolean) => void = noop;

  getSelectedOption() {
    if (this.options() !== null && this.value() !== null) {
      return this.options()?.find(opt => opt.id === this.value())?.name;
    }
    return this.label();
  }
  //
  // Implementing ControlValueAccessor
  //
  writeValue(value: number | string | null): void {
    this.value.set(value);
  }

  registerOnChange(onChange: (value: number | string | null) => void): void {
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
