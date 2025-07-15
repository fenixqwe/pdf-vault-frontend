import React from "react";

import {Navigate} from "react-router-dom";

import {RoleBasedRedirect} from "@/router/RoleBasedRedirect.tsx";
import {ProtectedRoute} from "@/router/ProtectedRoute.tsx";

import {UserRoles} from "@/models/User.ts";

import SignIn from "@/components/pages/authorization/SignIn";
import Documents from "@/components/pages/user/documents/Documents";
import AdminPanel from "@/components/pages/admin/AdminPanel";
import Page from "@/components/pages/Page.tsx";
import UserDocuments from "@/components/pages/admin/userDocuments/UserDocuments.tsx";
import ResetPassword from "@/components/pages/authorization/resetPassword/ResetPassword.tsx";
import StepOne from "@/components/pages/authorization/resetPassword/stepOne/StepOne.tsx";
import StepTwo from "@/components/pages/authorization/resetPassword/stepTwo/StepTwo.tsx";
import StepThree from "@/components/pages/authorization/resetPassword/stepThree/StepThree.tsx";


export interface RouteItem {
    path?: string;
    component: React.ReactElement;
    index?: boolean;
    children?: RouteItem[];
    roles?: string[];
}

export const publicRoutes: RouteItem[] = [
    { path: "/", component: <SignIn /> },
    {
        path: "/resetPassword", component: <ResetPassword/>, children: [
            {index: true, component: <StepOne/>},
            {path: "newPassword", component: <StepTwo/>},
            {path: "passwordUpdated", component: <StepThree/>}
        ]
    },
    { path: "*", component: <Navigate to="/" replace /> }
];

export const privateRoutes: RouteItem[] = [
    {
        path: "main",
        component: <Page />,
        children: [
            {
                index: true,
                component: <RoleBasedRedirect />
            },
            {
                path: "documents",
                component: <ProtectedRoute allowedRoles={[UserRoles.USER]}><Documents /></ProtectedRoute>
            },
            {
                path: "admin-panel",
                component: <ProtectedRoute allowedRoles={[UserRoles.ADMIN]}><AdminPanel /></ProtectedRoute>
            },
            {
                path: "admin-panel/documents/:userId",
                component: <ProtectedRoute allowedRoles={[UserRoles.ADMIN]}><UserDocuments /></ProtectedRoute>
            }
        ]
    },
    { path: "*", component: <Navigate to="/main" replace /> }
];
