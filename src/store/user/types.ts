import type {User} from "@/models/User.ts";

export interface UserState {
    isAuth: boolean;
    sessionId: string | undefined;
    userData: User | null;
}