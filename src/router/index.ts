import SignIn from "@/components/pages/authorization/SignIn";
import type { ComponentType } from "react";

interface RouteType {
    path: string;
    component: ComponentType; // или JSX.Element
}

export const publicRoutes: RouteType[] = [
    {path: "/", component: SignIn},
]