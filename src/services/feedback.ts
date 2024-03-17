import { api } from './api';

export type UserFeedbackData = {
    message: string | null;
    rating: number;
};

export type ResponceFeedbackData = {
    rating: number;
    createdAt: string;
    id?: string;
    fullName?: string | null;
    imageSrc?: string | null;
    message?: string | null;
};

export const feedbackApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getFeedbacks: builder.mutation<Array<ResponceFeedbackData>, void>({
            query: () => ({
                url: '/feedback',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${
                        localStorage.getItem('access token') ||
                        sessionStorage.getItem('access token')
                    }`,
                },
            }),
        }),
        sendFeedback: builder.mutation<void, UserFeedbackData>({
            query: (userFeedbackData) => ({
                url: '/feedback',
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${
                        localStorage.getItem('access token') ||
                        sessionStorage.getItem('access token')
                    }`,
                },
                body: userFeedbackData,
            }),
        }),
    }),
});

export const { useGetFeedbacksMutation, useSendFeedbackMutation } = feedbackApi;

export const {
    endpoints: { getFeedbacks, sendFeedback },
} = feedbackApi;
