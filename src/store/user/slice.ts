import type {UserState} from "@/store/user/types.ts";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {User} from "@/models/User.ts";

const initialState: UserState = {
    isAuth: false,
    sessionId: undefined,
    userData: null
};

const slice = createSlice({
    name: "user",
    initialState,
    reducers: {
        changeIsAuth(state, action: PayloadAction<boolean>) {
            localStorage.setItem("auth", action.payload.toString());
            state.isAuth = action.payload;
        },
        changeUser: (state, action: PayloadAction<User>) => {
            const newUserData = {...action.payload};

            localStorage.setItem("user", JSON.stringify(newUserData));
            state.userData = newUserData;
        },
        changeSession(state, action: PayloadAction<string>) {
            localStorage.setItem("sessionId", action.payload);
            state.sessionId = action.payload;
        },
        clearUser(state) {
            localStorage.removeItem('auth');
            state.isAuth = false;
            localStorage.removeItem('user');
            state.userData = null;
            localStorage.removeItem('sessionId');
            state.sessionId = undefined;
        }
    }
})

export const {reducer: userReducer, actions: userActions} = slice;