import {createRoot} from 'react-dom/client'

import {Provider} from "react-redux";

import {store} from "@/store/store.ts";

import App from './App.tsx'

import './styles/index.css'

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <App />
    </Provider>,
)
