import {Routes, Route} from "react-router-dom";
import {publicRoutes} from "@/router";
import React from "react";

interface RouteItem {
    path: string;
    component: React.ComponentType;
    index?: boolean;
    children?: RouteItem[];
}

function AppRouter() {

    const getRouteFromTree = (routeTree: RouteItem[]) => {
        return routeTree.map((route) => {
            const Component = route.component;
            return (
                <Route path={route.path} element={<Component />} key={route.path}>
                    {route.children &&
                        route.children.map((routeChild, index) => {
                            const ChildComponent = routeChild.component;
                            return (
                                <Route
                                    path={routeChild.path}
                                    index={routeChild.index}
                                    element={<ChildComponent />}
                                    key={routeChild.path + `_${index}`}
                                />
                            );
                        })}
                </Route>
            );
        });
    };

    return (
        <Routes>
            {getRouteFromTree(publicRoutes)}
        </Routes>
    );
}

export default AppRouter;