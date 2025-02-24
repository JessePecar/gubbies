import { Component, input, output } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-button',
  imports: [MatButtonModule],
  template: `
  @switch(buttonType()) {
    @case('flat'){
      <button mat-flat-button (click)="onClick.emit()">{{text()}}</button>
    }
    @case('raised'){
      <button mat-raised-button (click)="onClick.emit()">{{text()}}</button>
    }
    @default(){
      <button mat-button (click)="onClick.emit()">{{text()}}</button>
    }
  }
  `,
  styles: ``
})
  
export class ButtonComponent {
  text = input<string>('');
  buttonType = input<'flat' | 'raised' | undefined>('raised');

  onClick = output<void>();
}
