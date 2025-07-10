import {Navigate} from "react-router-dom";

import {useAuth} from "@/hooks/useAuth.ts";

import {UserRoles} from "@/models/User.ts";

export const RoleBasedRedirect = () => {
    const { userRole } = useAuth();

    const targetRoute = (userRole === UserRoles.ADMIN
        ? "/main/admin-panel"
        : "/main/documents");

    return <Navigate to={targetRoute} replace />;
};