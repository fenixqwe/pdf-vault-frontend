export interface User {
    user_id: string;
    name: string;
    email: string;
    number: string | null;
    role: UserRoles;
}

export enum UserRoles {
    USER = "USER",
    ADMIN = "ADMIN"
}