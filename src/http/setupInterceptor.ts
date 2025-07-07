import axios, {type AxiosError, type AxiosInstance} from "axios";

let isRefreshing = false;

export const setupInterceptor = (apiInstance: AxiosInstance) => {
    apiInstance.interceptors.response.use(
        response => response,
        async (error: AxiosError) => {
            const originalRequest = error.config as any;

            if (error.response?.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                const refreshToken = localStorage.getItem("refreshToken");
                if (!refreshToken) {
                    return Promise.reject(error);
                }

                if (isRefreshing) {
                    return Promise.reject(error);
                }

                isRefreshing = true;

                try {
                    const response = await axios.get("http://localhost:5001/api/auth/refresh", {
                        headers: { Authorization: `Bearer ${refreshToken}` }
                    });

                    const { access_token, refresh_token } = response.data.data.tokens;

                    localStorage.setItem("accessToken", access_token);
                    localStorage.setItem("refreshToken", refresh_token);

                    originalRequest.headers["Authorization"] = `Bearer ${access_token}`;
                    return apiInstance(originalRequest);
                } catch (refreshError) {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    return Promise.reject(refreshError);
                } finally {
                    isRefreshing = false;
                }
            }

            return Promise.reject(error);
        }
    );
};