import { Item } from '../../models/items';
import { Adjustment } from './adjustment';

export class AdjustmentItems {
  adjustmentId!: number;
  itemId!: number;

  adjustment!: Adjustment;
  item!: Item;
}
