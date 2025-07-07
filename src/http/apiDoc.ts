import axios from "axios";
import {setupInterceptor} from "@/http/setupInterceptor.ts";

const $apiDoc = axios.create({
    baseURL: "http://localhost:5000",
})

$apiDoc.interceptors.request.use(config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('accessToken')}`
    return config;
});

setupInterceptor($apiDoc)

export default $apiDoc;