import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';
import { FirebaseService } from 'src/firebase/firebase.service';
import { User } from './entities/user.entity';
export declare class UserService {
    private firebaseService;
    constructor(firebaseService: FirebaseService);
    create(createUserDto: CreateUserDto): Promise<string>;
    findAll(params: QueryUserDto): Promise<{
        rows: User[];
        count: number;
    }>;
    findOne(id: string): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<string>;
    remove(id: string): Promise<string>;
    findByEmail(email: string): Promise<User>;
}
