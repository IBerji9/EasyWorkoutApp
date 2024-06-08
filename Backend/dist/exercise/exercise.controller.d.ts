import { ExerciseService } from './exercise.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { Exercise } from './entities/exercise.entity';
export declare class ExerciseController {
    private readonly exerciseService;
    constructor(exerciseService: ExerciseService);
    create(createDto: CreateExerciseDto): Promise<{
        data: string;
    }>;
    findAll(): Promise<{
        data: Exercise[];
    }>;
    findOne(id: string): Promise<{
        data: Exercise;
    }>;
    update(id: string, updateDto: UpdateExerciseDto): Promise<{
        data: string;
    }>;
    remove(id: string): Promise<{
        data: string;
    }>;
}
