import { Subcategory } from '@/inventory/categories/interfaces/subcategory.interface';

export interface ICategory {
  name: string;
  code: string;
  canPromote: boolean;
  canTransfer: boolean;

  subcategories: Subcategory[];
}

export class Category {
  name: string;
  code: string;
  canPromote: boolean;
  canTransfer: boolean;

  subcategories: Subcategory[];
  subcategoryCount: number;

  constructor(category: ICategory) {
    this.name = category.name;
    this.code = category.name;
    this.canPromote = category.canPromote;
    this.canTransfer = category.canTransfer;
    this.subcategories = category.subcategories;
    this.subcategoryCount = category.subcategories?.length ?? 0;
  }
}

// export interface Category {
//   name: string;
//   code: string;
//   canPromote: boolean;
//   canTransfer: boolean;

//   subcategories: Subcategory[];
// }
