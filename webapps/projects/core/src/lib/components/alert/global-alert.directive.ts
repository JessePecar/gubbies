import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { AlertType } from './AlertType';

@Directive({
  selector: '[alertBox]',
})
export class GlobalAlertDirective implements OnInit {
  @Input() alertBox: AlertType = 'info';

  constructor(private el: ElementRef) {}
  ngOnInit(): void {
    this.onAlertCreate();
  }

  onAlertCreate() {
    switch (this.alertBox) {
      case 'error':
        this.el.nativeElement.classList.add('text-red-100');
        this.el.nativeElement.classList.add('bg-red-900');
        break;
      case 'success':
        this.el.nativeElement.classList.add('text-green-100');
        this.el.nativeElement.classList.add('bg-green-700');
        break;
      case 'warning':
        this.el.nativeElement.classList.add('text-yellow-900');
        this.el.nativeElement.classList.add('bg-yellow-400');
        break;
      case 'info':
      default:
        this.el.nativeElement.classList.add('text-stone-900');
        this.el.nativeElement.classList.add('bg-stone-200');
        break;
    }
  }
}
