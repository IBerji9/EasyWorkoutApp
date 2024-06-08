import { Role } from 'src/user/entities/user.enum';
export declare class Paging {
    page?: number;
    limit?: number;
}
export type TokenPayload = {
    email: string;
    role: Role;
    id: string;
};
export type Message = {
    userId: number;
    name: string;
    content: string;
    media: string;
    note: string;
};
