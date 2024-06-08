import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { TokenPayload } from 'src/types';
import { QueryCategoryDto } from './dto/query-category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(createDto: CreateCategoryDto, request: {
        user: TokenPayload;
    }): Promise<{
        data: string;
    }>;
    findAll(params: QueryCategoryDto): Promise<{
        data: Category[];
    }>;
    findOne(id: string): Promise<{
        data: Category;
    }>;
    update(id: string, updateDto: UpdateCategoryDto): Promise<{
        data: string;
    }>;
    remove(id: string): Promise<{
        data: string;
    }>;
}
