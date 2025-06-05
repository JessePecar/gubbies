export interface ShelfLocation {
  id: number;
  aisle: number;
  side: ShelfSide;
  section: string;
}

export enum ShelfSide {
  RIGHT,
  LEFT,
}
