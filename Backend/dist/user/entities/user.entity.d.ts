import { Role } from 'src/user/entities/user.enum';
export declare class User {
    id: string;
    name: string;
    email: string;
    language: string;
    unit: string;
    password: string;
    role: Role;
    constructor(partial: Partial<User>);
}
