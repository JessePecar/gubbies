import { Component, input } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldAppearance, MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule],
  template: `
  <div>
    <mat-form-field [appearance]="appearance()">
      <mat-label>{{label() ?? placeholder()}}</mat-label>
        <input matInput [placeholder]="placeholder()" [value]="value()" (blur)="onUnfocus()" [required]="required()">
    </mat-form-field>
  </div>
  `,
  styles: ``,
})
  
export class TextInputComponent {
  placeholder = input.required<string>();
  value = input<string>('');
  appearance = input<MatFormFieldAppearance>('fill');
  label = input<string | undefined>(undefined);
  required = input<boolean>(false);

  onUnfocus() {
    // Do some work
  }
}
