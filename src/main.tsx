import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'
import {Provider} from "react-redux";
import {store} from "@/store/store.ts";
import AxiosResponseInterceptor from "@/http/AxiosResponseInterceptor.ts";

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <AxiosResponseInterceptor>
            <StrictMode>
                <App />
            </StrictMode>
        </AxiosResponseInterceptor>
    </Provider>,
)
