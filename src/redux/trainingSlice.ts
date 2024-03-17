import { createSlice } from '@reduxjs/toolkit';
import { editTraining, getTraining, sendTraining } from '@services/training';

import { RootState } from './configure-store';

type InitialState = {
    update: boolean;
};

const initialState: InitialState = {
    update: false,
};

const slice = createSlice({
    name: 'training',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(getTraining.matchFulfilled, (state) => {
            state.update = false;
        });
        builder.addMatcher(sendTraining.matchFulfilled, (state) => {
            state.update = true;
        });
        builder.addMatcher(editTraining.matchFulfilled, (state) => {
            state.update = true;
        });
    },
});

export default slice.reducer;

export const selectTrainingUpdate = (state: RootState) => state.training.update;
