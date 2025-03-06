import { AdjustmentItems } from './adjustmentItems';

export class Adjustment {
  id!: number;
  status!: number; // Enum
  type!: number; // Enum
  createDate!: string;
  completeDate!: string;

  adjustmentItems!: AdjustmentItems[];
}
