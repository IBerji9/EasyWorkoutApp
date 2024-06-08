import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';
import { FirebaseService } from 'src/firebase/firebase.service';
import { Progress } from './entities/progress.entity';
import { QueryProgressDto } from './dto/query-progress.dto';
export declare class ProgressService {
    private firebaseService;
    constructor(firebaseService: FirebaseService);
    create(createDto: CreateProgressDto): Promise<string>;
    findAll(params: QueryProgressDto): Promise<Progress[]>;
    findOne(id: string): Promise<Progress>;
    update(id: string, updateDto: UpdateProgressDto): Promise<string>;
    remove(id: string): Promise<string>;
}
