import { WorkoutService } from './workout.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { Workout } from './entities/workout.entity';
import { TokenPayload } from 'src/types';
import { QueryWorkoutDto } from './dto/query-workout.dto';
export declare class WorkoutController {
    private readonly workoutService;
    constructor(workoutService: WorkoutService);
    create(createDto: CreateWorkoutDto, request: {
        user: TokenPayload;
    }): Promise<{
        data: string;
    }>;
    findAll(params: QueryWorkoutDto): Promise<{
        data: Workout[];
    }>;
    findOne(id: string): Promise<{
        data: Workout;
    }>;
    update(id: string, updateDto: UpdateWorkoutDto): Promise<{
        data: string;
    }>;
    remove(id: string): Promise<{
        data: string;
    }>;
}
