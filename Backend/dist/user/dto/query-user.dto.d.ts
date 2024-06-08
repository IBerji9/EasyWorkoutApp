import { Role } from 'src/user/entities/user.enum';
export declare class QueryUserDto {
    role?: Role;
    is_active?: boolean;
    is_deleted?: boolean;
    user_ids?: number[];
    name?: Role;
}
export type QueryUser = {
    where: {
        role?: Role;
        is_active?: boolean;
        is_deleted?: boolean;
        id?: number[];
        first_name?: any;
        last_name?: any;
    };
};
