import {
  Category,
  Family,
  Subcategory,
} from '@/inventory/categories/interfaces';
import { AdjustmentItems } from '../adjustments/models/adjustmentItems';
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
  subcategory?: Subcategory;
  family?: Family;
}
