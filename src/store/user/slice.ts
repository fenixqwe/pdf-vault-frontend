import type {UserState} from "@/store/user/types.ts";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {User} from "@/models/User.ts";

const initialState: UserState = {
    isAuth: false,
    userData: null
};

const slice = createSlice({
    name: "user",
    initialState,
    reducers: {
        changeIsAuth(state, action: PayloadAction<boolean>) {
            localStorage.setItem("auth", action.payload.toString());
            console.log(action.payload);
            state.isAuth = action.payload;
        },
        changeUser: (state, action: PayloadAction<User>) => {
            const newUserData = {...action.payload};

            localStorage.setItem("user", JSON.stringify(newUserData));
            state.userData = newUserData;
        },
        clearUser(state) {
            localStorage.removeItem('auth');
            state.isAuth = false;
            localStorage.removeItem('user');
            state.userData = null;
        }
    }
})

export const {reducer: userReducer, actions: userActions} = slice;