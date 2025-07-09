import {configureStore} from "@reduxjs/toolkit";
import {userReducer} from "@/store/user/slice.ts";
import {documentsReducer} from "@/store/documents/slice.ts";
import {adminUsersReducer} from "@/store/adminUsers/slice.ts";
import {rolesReducer} from "@/store/roles/slice.ts";

export const store = configureStore({
    reducer: {
        user: userReducer,
        documents: documentsReducer,
        adminUsers: adminUsersReducer,
        roles: rolesReducer,
    }
});

export * from "@/store/user/slice.ts";
export * from "@/store/documents/slice.ts";
export * from "@/store/adminUsers/slice.ts";
export * from "@/store/roles/slice.ts";
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;