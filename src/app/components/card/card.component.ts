import { Component } from '@angular/core';

@Component({
  selector: 'card',
  imports: [],
  template: `
    <div class="card shadow-sm">
      <ng-content select="[header]" />
      <ng-content select="[body]" />
      <ng-content select="[footer]" />
      <ng-content />
    </div>
  `,
  styles: ``,
})
export class CardComponent {}

@Component({
  selector: 'card-header',
  imports: [],
  template: `
    <div header class="w-full">
      <ng-content />
    </div>
  `,
  styles: ``,
})
export class CardHeaderComponent {}

@Component({
  selector: 'card-body',
  imports: [],
  template: `
    <div body class="w-full">
      <ng-content />
    </div>
  `,
  styles: ``,
})
export class CardBodyComponent {}

@Component({
  selector: 'card-footer',
  imports: [],
  template: `
    <div footer class="w-full">
      <ng-content />
    </div>
  `,
  styles: ``,
})
export class CardFooterComponent {}
