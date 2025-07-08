import {configureStore} from "@reduxjs/toolkit";
import {userReducer} from "@/store/user/slice.ts";
import {documentsReducer} from "@/store/documents/slice.ts";

export const store = configureStore({
    reducer: {
        user: userReducer,
        documents: documentsReducer,
    }
});

export * from "@/store/user/slice.ts";
export * from "@/store/documents/slice.ts";
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;