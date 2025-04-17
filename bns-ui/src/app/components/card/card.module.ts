import { NgModule } from '@angular/core';
import {
  CardBodyComponent,
  CardComponent,
  CardFooterComponent,
  CardHeaderComponent,
} from './card.component';

@NgModule({
  imports: [
    CardComponent,
    CardBodyComponent,
    CardFooterComponent,
    CardHeaderComponent,
  ],
  exports: [
    CardComponent,
    CardBodyComponent,
    CardFooterComponent,
    CardHeaderComponent,
  ],
})
export class CardModule {}
