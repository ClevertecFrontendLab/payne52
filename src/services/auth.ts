import { api } from './api';

export type UserEmailData = {
    email: string;
};

export type UserData = UserEmailData & {
    password: string;
};

export type UserConfirmEmailData = UserEmailData & {
    code: string;
};

export type UserNewPasswordData = {
    password: string;
    confirmPassword: string;
};

export type ResponseLoginData = {
    accessToken: string;
};

export type ResponseEmailData = {
    email: string;
    message: string;
};

export type ResponseChangePasswordData = Omit<ResponseEmailData, 'email'>;

export const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<ResponseLoginData, UserData>({
            query: (userData) => ({
                url: '/auth/login',
                method: 'POST',
                body: userData,
            }),
        }),
        register: builder.mutation<void, UserData>({
            query: (userData) => ({
                url: '/auth/registration',
                method: 'POST',
                body: userData,
            }),
        }),
        checkEmail: builder.mutation<ResponseEmailData, UserEmailData>({
            query: (userData) => ({
                url: '/auth/check-email',
                method: 'POST',
                body: userData,
            }),
        }),
        confirmEmail: builder.mutation<ResponseEmailData, UserConfirmEmailData>({
            query: (userData) => ({
                url: '/auth/confirm-email',
                method: 'POST',
                body: userData,
                credentials: 'include',
            }),
        }),
        changePassword: builder.mutation<ResponseChangePasswordData, UserNewPasswordData>({
            query: (userData) => ({
                url: '/auth/change-password',
                method: 'POST',
                body: userData,
                credentials: 'include',
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useCheckEmailMutation,
    useConfirmEmailMutation,
    useChangePasswordMutation,
} = authApi;

export const {
    endpoints: { login, register, checkEmail, confirmEmail, changePassword },
} = authApi;
