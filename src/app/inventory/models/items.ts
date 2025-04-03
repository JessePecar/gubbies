import { AdjustmentItems } from '../adjustments/models/adjustmentItems';
import { Category } from './category';
import { Family } from './family';
import { SubCategory } from './subCategory';
import { UnitOfMeasurementType } from './unitOfMeasurementType';

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
  unitOfMeasurementType!: UnitOfMeasurementType; // Enum
  adjustmentItems!: AdjustmentItems[];
  category!: Category;
  subCategory?: SubCategory;
  family?: Family;
}
