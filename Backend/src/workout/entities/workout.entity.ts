export class Workout {
  id: string;
  title: string;
  exercises: number;
  routine_id: string;
  user_id: string;

  constructor(partial: Partial<Workout>) {
    Object.assign(this, partial);
  }
}
