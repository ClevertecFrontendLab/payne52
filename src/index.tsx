import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { Paths } from '@constants/paths';
import { history, store } from '@redux/configure-store';
import { HistoryRouter as Router } from 'redux-first-history/rr6';

import { AuthPage, MainPage } from './pages';

import './assets/fonts/fonts.css';
import 'antd/dist/antd.css';
import 'normalize.css';
import './index.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router history={history}>
                <Routes>
                    <Route path={Paths.HOME} element={<MainPage />} />
                    <Route path={Paths.MAIN} element={<MainPage />} />
                    <Route path={Paths.AUTH} element={<AuthPage />} />
                    <Route path={Paths.REGISTER} element={<AuthPage />} />
                    <Route path='*' element={<p>Sorry, nothing here</p>} />
                </Routes>
            </Router>
        </Provider>
    </React.StrictMode>,
);
