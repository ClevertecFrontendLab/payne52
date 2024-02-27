import { configureStore } from '@reduxjs/toolkit';
import { api } from '@services/api';
import { createBrowserHistory } from 'history';
import { combineReducers } from 'redux';
import { createReduxHistoryContext } from 'redux-first-history';

import auth from './authSlice';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
    history: createBrowserHistory(),
});

export const store = configureStore({
    reducer: combineReducers({
        router: routerReducer,
        [api.reducerPath]: api.reducer,
        auth,
    }),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(routerMiddleware).concat(api.middleware),
});

export const history = createReduxHistory(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
