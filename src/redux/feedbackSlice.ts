import { createSlice } from '@reduxjs/toolkit';
import { getFeedbacks } from '@services/feedback';

import { RootState } from './configure-store';

type InitialState = {
    update: boolean;
};

const initialState: InitialState = {
    update: false,
};

const slice = createSlice({
    name: 'feedback',
    initialState,
    reducers: {
        newFeedback: (state) => {
            state.update = true;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(getFeedbacks.matchFulfilled, (state) => {
            state.update = false;
        });
    },
});

export default slice.reducer;

export const { newFeedback } = slice.actions;

export const selectFeedbacksUpdate = (state: RootState) => state.feedback.update;
