import {useActionCreators, useAppSelector} from "@/hooks/redux.ts";
import {userActions} from "@/store/user/slice.ts";
import $api from "@/http/index.ts";
import {type ReactNode, useEffect} from "react";
import axios from "axios";

interface AxiosResponseInterceptorProps {
    children: ReactNode;
}

const AxiosResponseInterceptor = ({children}: AxiosResponseInterceptorProps) => {
    const isAuth = useAppSelector((state) => state.user.isAuth);

    const userAction = useActionCreators(userActions);

    useEffect(() => {
        $api.interceptors.response.use((config) => {
            return config;
        }, async (error) => {
            const originalRequest = error.config;
            if (error.response.status === 401 && error.config && !error.config._isRetry) {
                originalRequest._isRetry = true;
                const beforeReqAccessToken =  localStorage.getItem('access_token');
                const beforeReqRefreshToken =  localStorage.getItem('refresh_token');
                try {
                    const options = {headers: {authorization: `Bearer ${localStorage.getItem('refresh_token')}`}};
                    const response = await axios.get(`${process.env.REACT_APP_API_URL}api/auth/refresh`, options);
                    localStorage.setItem('access_token', response.data.data.tokens.access_token);
                    localStorage.setItem('refresh_token', response.data.data.tokens.refresh_token);
                    return $api.request(originalRequest);
                } catch (e) {
                    if (beforeReqAccessToken === localStorage.getItem('access_token')
                        && beforeReqRefreshToken === localStorage.getItem('refresh_token')) {
                        localStorage.removeItem('access_token');
                        localStorage.removeItem('refresh_token');

                        userAction.clearUser();
                    } else {
                        return $api.request(originalRequest);
                    }
                }
            }
            return Promise.reject(error);
        });
    }, [isAuth]);

    return children;
}

export default AxiosResponseInterceptor;