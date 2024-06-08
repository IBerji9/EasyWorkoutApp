import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { FirebaseService } from 'src/firebase/firebase.service';
import { Exercise } from './entities/exercise.entity';
export declare class ExerciseService {
    private firebaseService;
    constructor(firebaseService: FirebaseService);
    create(createDto: CreateExerciseDto): Promise<string>;
    findAll(): Promise<Exercise[]>;
    findOne(id: string): Promise<Exercise>;
    update(id: string, updateDto: UpdateExerciseDto): Promise<string>;
    remove(id: string): Promise<string>;
}
