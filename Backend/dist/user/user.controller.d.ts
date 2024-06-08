import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { User } from './entities/user.entity';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<{
        data: string;
    }>;
    findAll(params: QueryUserDto): Promise<{
        data: User[];
        total: number;
    }>;
    findOne(id: string): Promise<{
        data: User;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        data: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
