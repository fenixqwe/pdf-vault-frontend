import axios from "axios";
import {setupInterceptor} from "@/http/setupInterceptor.ts";

const $apiUser = axios.create({
    baseURL: import.meta.env.VITE_API_USER_URL,
})

$apiUser.interceptors.request.use(config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('accessToken')}`
    return config;
});

setupInterceptor($apiUser);

export default $apiUser;