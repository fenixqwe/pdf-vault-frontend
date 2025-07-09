import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {Role, RolesState} from "@/store/roles/types.ts";

const initialState: RolesState = {
    roles: []
};

const slice = createSlice({
    name: "roles",
    initialState,
    reducers: {
        changeRoles: (state, action: PayloadAction<Role[]>) => {
            state.roles = action.payload;
        },
    }
})

export const {reducer: rolesReducer, actions: rolesActions} = slice;