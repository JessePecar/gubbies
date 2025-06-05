import { Item } from '@/models/bns';
import { Adjustment } from './adjustment';

export class AdjustmentItems {
  adjustmentId!: number;
  itemId!: number;

  adjustment!: Adjustment;
  item!: Item;
}
