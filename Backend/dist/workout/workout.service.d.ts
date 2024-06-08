import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { FirebaseService } from 'src/firebase/firebase.service';
import { Workout } from './entities/workout.entity';
import { QueryWorkoutDto } from './dto/query-workout.dto';
export declare class WorkoutService {
    private firebaseService;
    constructor(firebaseService: FirebaseService);
    create(createDto: CreateWorkoutDto): Promise<string>;
    findAll(params: QueryWorkoutDto): Promise<Workout[]>;
    findOne(id: string): Promise<Workout>;
    update(id: string, updateDto: UpdateWorkoutDto): Promise<string>;
    remove(id: string): Promise<string>;
}
