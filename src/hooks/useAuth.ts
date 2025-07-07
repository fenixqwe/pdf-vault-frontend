import {useAppSelector} from "@/hooks/redux.ts";
import type {UserRoles} from "@/models/User.ts";

export const useAuth = () => {
    const { isAuth, userData } = useAppSelector(state => state.user);

    const hasRole = (role: UserRoles) => userData?.role === role;

    return { isAuth, userRole: userData?.role, hasRole };
};