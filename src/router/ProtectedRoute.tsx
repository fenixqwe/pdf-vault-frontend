import React from "react";
import {useAppSelector} from "@/hooks/redux.ts";
import {Navigate} from "react-router-dom";

export const ProtectedRoute = ({children, allowedRoles}: {
    children: React.ReactElement;
    allowedRoles: string[];
}) => {
    const { isAuth, userData } = useAppSelector((state) => state.user);

    if (!isAuth) return <Navigate to="/" replace />;
    if (!allowedRoles.includes(userData?.role!)) return <Navigate to="/main" replace />;

    return children;
};