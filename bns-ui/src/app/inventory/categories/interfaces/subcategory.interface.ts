import { Family } from "@/inventory/categories/interfaces/family.interface";

export interface Subcategory {
  code: string;
  name: string;
  canPromoted: boolean;
  families: Family[];
}