import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '@services/auth';

import { RootState } from './configure-store';

interface InitialState {
    isAuthenticated: boolean;
}

const initialState: InitialState = {
    isAuthenticated: false,
};

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state) => {
            state.isAuthenticated = true;
        },
        logout: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state) => {
            state.isAuthenticated = true;
        });
    },
});

export const { login, logout } = slice.actions;
export default slice.reducer;

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
