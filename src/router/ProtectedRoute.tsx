import React from "react";

import {Navigate} from "react-router-dom";

import {useAuth} from "@/hooks/useAuth.ts";

export const ProtectedRoute = ({children, allowedRoles}: {
    children: React.ReactElement;
    allowedRoles: string[];
}) => {
    const { isAuth, userData } = useAuth();

    if (!isAuth) return <Navigate to="/" replace />;
    if (!allowedRoles.includes(userData?.role!)) return <Navigate to="/main" replace />;

    return children;
};