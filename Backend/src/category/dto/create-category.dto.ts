import { Type } from '../entities/category.enum';

export class CreateCategoryDto {
  title: string;
  type: Type;
  user_id?: string;
  date_recorded: Date;
}
