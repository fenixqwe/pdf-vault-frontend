import axios from "axios";
import {setupInterceptor} from "@/http/setupInterceptor.ts";

const $apiDoc = axios.create({
    baseURL: import.meta.env.VITE_API_DOC_URL,
})

$apiDoc.interceptors.request.use(config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('accessToken')}`
    return config;
});

setupInterceptor($apiDoc)

export default $apiDoc;