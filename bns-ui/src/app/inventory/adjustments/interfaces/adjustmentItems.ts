import { Item } from '../../items/interfaces/items';
import { Adjustment } from './adjustment';

export class AdjustmentItems {
  adjustmentId!: number;
  itemId!: number;

  adjustment!: Adjustment;
  item!: Item;
}
