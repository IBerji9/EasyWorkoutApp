import { Workout } from 'src/workout/entities/workout.entity';
export declare class Routine {
    id: string;
    title: string;
    user_id: string;
    category_id: string;
    workouts: Workout[];
    constructor(partial: Partial<Routine>);
}
