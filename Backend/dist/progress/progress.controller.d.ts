import { ProgressService } from './progress.service';
import { CreateProgressDto } from './dto/create-progress.dto';
import { UpdateProgressDto } from './dto/update-progress.dto';
import { Progress } from './entities/progress.entity';
import { QueryProgressDto } from './dto/query-progress.dto';
import { TokenPayload } from 'src/types';
export declare class ProgressController {
    private readonly progressService;
    constructor(progressService: ProgressService);
    create(createDto: CreateProgressDto, request: {
        user: TokenPayload;
    }): Promise<{
        data: string;
    }>;
    findAll(params: QueryProgressDto): Promise<{
        data: Progress[];
    }>;
    findOne(id: string): Promise<{
        data: Progress;
    }>;
    update(id: string, updateDto: UpdateProgressDto): Promise<{
        data: string;
    }>;
    remove(id: string): Promise<{
        data: string;
    }>;
}
