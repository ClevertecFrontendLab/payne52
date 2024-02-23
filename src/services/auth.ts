import { api } from './api';

export type ResponseLoginData = {
    accessToken: string;
};

export type ResponseRegisterData = Record<string, never>;

export type UserData = {
    email: string;
    password: string;
};

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<ResponseLoginData, UserData>({
            query: (userData) => ({
                url: '/auth/login',
                method: 'POST',
                body: userData,
            }),
        }),
        register: builder.mutation<ResponseRegisterData, UserData>({
            query: (userData) => ({
                url: '/auth/registration',
                method: 'POST',
                body: userData,
            }),
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;

export const {
    endpoints: { login, register },
} = authApi;
