import { api } from './api';

export type TrainingType = {
    name: string;
    key: string;
};

export type ResponceTrainingTypeList = TrainingType[];

export type UserExercise = {
    name: string;
    replays?: number;
    weight?: number;
    approaches?: number;
    isImplementation?: boolean;
};

export type UserTrainingParameters = {
    repeat: boolean;
    period: number;
    jointTraining: boolean;
    participants?: [];
};

export type UserTraining = {
    name: string;
    date: string;
    exercises: UserExercise[];
    isImplementation?: boolean;
    parameters?: UserTrainingParameters;
};

export type UserEditTraining = {
    trainingId: string;
    trainingData: UserTraining;
};

export type ResponceExercise = UserExercise & {
    _id: string;
};

export type ResponceTrainingParameters = UserTrainingParameters;

export type ResponceTraining = Omit<UserTraining, 'parametrs' | 'exercises'> & {
    _id: string;
    userId: string;
    exercises: ResponceExercise[];
    parameters?: ResponceTrainingParameters;
};

export type ResponceTrainingList = ResponceTraining[];

export const trainingApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getTraining: builder.mutation<ResponceTrainingList, void>({
            query: () => ({
                url: '/training',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${
                        localStorage.getItem('access token') ||
                        sessionStorage.getItem('access token')
                    }`,
                },
            }),
        }),
        getTrainingTypeList: builder.mutation<ResponceTrainingTypeList, void>({
            query: () => ({
                url: '/catalogs/training-list',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${
                        localStorage.getItem('access token') ||
                        sessionStorage.getItem('access token')
                    }`,
                },
            }),
        }),
        sendTraining: builder.mutation<void, UserTraining>({
            query: (data) => ({
                url: '/training',
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${
                        localStorage.getItem('access token') ||
                        sessionStorage.getItem('access token')
                    }`,
                },
                body: data,
            }),
        }),
        editTraining: builder.mutation<void, UserEditTraining>({
            query: (data) => ({
                url: `/training/${data.trainingId}`,
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${
                        localStorage.getItem('access token') ||
                        sessionStorage.getItem('access token')
                    }`,
                },
                body: data.trainingData,
            }),
        }),
    }),
});

export const {
    useGetTrainingMutation,
    useGetTrainingTypeListMutation,
    useSendTrainingMutation,
    useEditTrainingMutation,
} = trainingApi;

export const {
    endpoints: { getTraining, sendTraining, editTraining },
} = trainingApi;
