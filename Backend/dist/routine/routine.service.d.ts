import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { FirebaseService } from 'src/firebase/firebase.service';
import { Routine } from './entities/routine.entity';
import { QueryRoutineDto } from './dto/query-routine.dto';
export declare class RoutineService {
    private firebaseService;
    constructor(firebaseService: FirebaseService);
    create(createDto: CreateRoutineDto): Promise<string>;
    findAll(params: QueryRoutineDto): Promise<Routine[]>;
    findOne(id: string): Promise<Routine>;
    update(id: string, updateDto: UpdateRoutineDto): Promise<string>;
    remove(id: string): Promise<string>;
}
