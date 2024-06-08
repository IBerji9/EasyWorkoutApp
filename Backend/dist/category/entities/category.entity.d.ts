import { Routine } from 'src/routine/entities/routine.entity';
import { Type } from './category.enum';
export declare class Category {
    id: string;
    title: string;
    user_id: string;
    type: Type;
    routines: Routine[];
    constructor(partial: Partial<Category>);
}
