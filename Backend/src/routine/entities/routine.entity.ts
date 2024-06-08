import { Type } from 'src/category/entities/category.enum';
import { Workout } from 'src/workout/entities/workout.entity';

export class Routine {
  id: string;
  title: string;
  user_id: string;
  category_id: string;
  workouts: Workout[];

  constructor(partial: Partial<Routine>) {
    Object.assign(this, partial);
  }
}
