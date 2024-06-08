import { User } from 'src/user/entities/user.entity';
export declare class SigninEntity extends User {
    token: string;
    constructor(partial: Partial<SigninEntity>);
}
