import {
  Category,
  Family,
  Subcategory,
} from '@/inventory/categories/interfaces';
import { AdjustmentItems } from '@/inventory/adjustments/interfaces/adjustmentItems';
import { UnitOfMeasurementType } from '@/inventory/items/interfaces/unitOfMeasurementType';

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
  subcategory?: Subcategory;
  family?: Family;
}
