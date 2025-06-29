import { IsBoolean, IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class BaseHousehold {
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  isDeleted: boolean;
  
  @IsBoolean()
  isActive: boolean;
}

export class Household extends BaseHousehold {
  @IsInt()
  @IsPositive()
  id: number;
}