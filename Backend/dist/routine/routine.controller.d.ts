import { RoutineService } from './routine.service';
import { CreateRoutineDto } from './dto/create-routine.dto';
import { UpdateRoutineDto } from './dto/update-routine.dto';
import { Routine } from './entities/routine.entity';
import { TokenPayload } from 'src/types';
import { QueryRoutineDto } from './dto/query-routine.dto';
export declare class RoutineController {
    private readonly routineService;
    constructor(routineService: RoutineService);
    create(createDto: CreateRoutineDto, request: {
        user: TokenPayload;
    }): Promise<{
        data: string;
    }>;
    findAll(params: QueryRoutineDto): Promise<{
        data: Routine[];
    }>;
    findOne(id: string): Promise<{
        data: Routine;
    }>;
    update(id: string, updateDto: UpdateRoutineDto): Promise<{
        data: string;
    }>;
    remove(id: string): Promise<{
        data: string;
    }>;
}
