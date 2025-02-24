import { Component, input, output } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-button',
  imports: [MatButtonModule],
  template: `
  @switch(buttonType()) {
    @case('flat'){
      <button mat-flat-button [disabled]="disabled" (click)="onClick.emit()">{{text()}}</button>
    }
    @case('raised'){
      <button mat-raised-button [disabled]="disabled" (click)="onClick.emit()">{{text()}}</button>
    }
    @default(){
      <button mat-button [disabled]="disabled" (click)="onClick.emit()">{{text()}}</button>
    }
  }
  `,
  styles: ``
})
  
export class ButtonComponent {
  disabled = input<boolean>(false);
  text = input<string>('');
  buttonType = input<'flat' | 'raised' | undefined>('raised');

  onClick = output<void>();
}
