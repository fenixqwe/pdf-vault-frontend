import type {User} from "@/models/User.ts";

export interface UserState {
    isAuth: boolean;
    userData: User | {};
}