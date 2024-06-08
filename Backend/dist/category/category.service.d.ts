import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FirebaseService } from 'src/firebase/firebase.service';
import { Category } from './entities/category.entity';
import { QueryCategoryDto } from './dto/query-category.dto';
export declare class CategoryService {
    private firebaseService;
    constructor(firebaseService: FirebaseService);
    create(createDto: CreateCategoryDto): Promise<string>;
    findAll(params?: QueryCategoryDto): Promise<Category[]>;
    findOne(id: string): Promise<Category>;
    update(id: string, updateDto: UpdateCategoryDto): Promise<string>;
    remove(id: string): Promise<string>;
}
