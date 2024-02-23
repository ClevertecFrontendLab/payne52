import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '@services/auth';

import { RootState } from './configure-store';

interface InitialState {
    isAuthenticated: boolean;
    accessToken: string | null;
}

const initialState: InitialState = {
    isAuthenticated: false,
    accessToken: null,
};

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: () => initialState,
    },
    extraReducers: (builder) => {
        builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
            state.accessToken = action.payload.accessToken;
            state.isAuthenticated = true;
        });
    },
});

export const { logout } = slice.actions;
export default slice.reducer;

export const selectIsAuthorized = (state: RootState) => state.auth.isAuthenticated;
