import {Route, Routes} from "react-router-dom";
import {useAppSelector} from "@/hooks/redux.ts";
import {privateRoutes, publicRoutes, type RouteItem} from "@/router";

const AppRouter = () => {
    const isAuth = useAppSelector((state) => state.user.isAuth);

    const getRouteFromTree = (routeTree: RouteItem[]) => {
        return routeTree.map((route) => (
            <Route path={route.path} element={route.component} key={route.path}>
                {route.children
                    && route.children.map((routeChild, index) => (
                        <Route path={routeChild.path} index={routeChild.index}
                               element={routeChild.component} key={routeChild.path + `_${index}`}/>
                    ))}
            </Route>
        ));
    }

    return isAuth ? (
        <Routes>
            {getRouteFromTree(privateRoutes)}
        </Routes>
    ) : (
        <Routes>
            {getRouteFromTree(publicRoutes)}
        </Routes>
    );
};

export default AppRouter;