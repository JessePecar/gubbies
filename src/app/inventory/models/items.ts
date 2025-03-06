import { AdjustmentItems } from '../adjustments/models/adjustmentItems';
import { Category } from './category';

export class Item {
  id!: number;
  name!: string;
  categoryCode!: string;
  quantityOnHand!: string;
  basePrice!: number;
  currentPrice!: number;
  isActive!: boolean;
  retirementStatus!: number; // Enum
  reorderQuantity!: number;
  unitOfMeasurementType!: number; // Enum
  adjustmentItems!: AdjustmentItems[];
  category!: Category;
}
