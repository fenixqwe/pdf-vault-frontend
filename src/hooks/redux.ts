import {type TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "@/store/store.ts";
import {type ActionCreator, type ActionCreatorsMapObject, bindActionCreators} from "redux";
import {useMemo} from "react";
import type {AsyncThunk} from "@reduxjs/toolkit";

export const useAppDispatch = useDispatch<AppDispatch>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useActionCreators = <Actions extends ActionCreatorsMapObject>(
    actions: Actions
) => {
    const dispatch = useAppDispatch();

    return useMemo(() => bindActionCreators(actions, dispatch), []);
};

type BoundActions<Actions extends ActionCreatorsMapObject> = {
    [key in keyof Actions]: Actions[key] extends AsyncThunk<any, any, any>
        ? BoundAsyncThunk<Actions[key]>
        : Actions[key];
};

type BoundAsyncThunk<Action extends ActionCreator<any>> = (
    ...args: Parameters<Action>
) => ReturnType<ReturnType<Action>>;

export const useActionCreatorsTyped = <
    Actions extends ActionCreatorsMapObject = ActionCreatorsMapObject
>(
    actions: Actions
): BoundActions<Actions> => {
    const dispatch = useAppDispatch();

    return useMemo(() => bindActionCreators(actions, dispatch), []);
};