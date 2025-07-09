import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {AdminUsersState} from "@/store/adminUsers/types.ts";
import type {AdminUsers} from "@/models/AdminUsers.ts";

const initialState: AdminUsersState = {
    users: []
};

const slice = createSlice({
    name: "adminUsers",
    initialState,
    reducers: {
        changeUsers: (state, action: PayloadAction<AdminUsers[]>) => {
            state.users = action.payload;
        },
        addNewUser: (state, action: PayloadAction<AdminUsers>) => {
            state.users.push(action.payload);
        },
        deleteUser: (state, action: PayloadAction<string>) => {
            const index = state.users.findIndex(user => user.user_id === action.payload);
            state.users.splice(index, 1);
        },
        updateUser: (state, action: PayloadAction<AdminUsers>) => {
            const updatedUser = action.payload;
            state.users = state.users.map(user =>
                user.user_id === updatedUser.user_id ? updatedUser : user
            );
        },
    }
})

export const {reducer: adminUsersReducer, actions: adminUsersActions} = slice;