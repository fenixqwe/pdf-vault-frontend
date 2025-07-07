import axios from "axios";
import {setupInterceptor} from "@/http/setupInterceptor.ts";

const $apiUser = axios.create({
    baseURL: "http://localhost:5001",
})

$apiUser.interceptors.request.use(config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('accessToken')}`
    return config;
});

setupInterceptor($apiUser);

export default $apiUser;