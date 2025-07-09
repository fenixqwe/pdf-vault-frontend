import {UserRoles} from "@/models/User.ts";

export interface AdminUsers {
    user_id: string;
    name: string;
    email: string;
    number: string | null;
    role: UserRoles;
    lastLoginAt: string | null;
    lastSessionDuration: number | null;
}