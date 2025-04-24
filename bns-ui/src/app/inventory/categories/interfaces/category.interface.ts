import { Subcategory } from "@/inventory/categories/interfaces/subcategory.interface";

export interface Category {
  name: string;
  code: string;
  canPromote: boolean;

  subcategories: Subcategory[]
}