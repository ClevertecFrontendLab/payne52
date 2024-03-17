import { Navigate, Route, Routes } from 'react-router-dom';
import {
    ChangePassword,
    ChangePasswordSuccess,
    CheckEmailErrorUNE,
    ConfirmEmail,
    Error500,
    LoginError,
    RegisterError,
    RegisterErrorUserExist,
    RegisterSuccess,
    SaveDataError,
} from '@components/index';
import { AppLayout, AuthLayout } from '@components/layout';
import { Paths } from '@constants/paths';
import { selectIsAuthenticated } from '@redux/authSlice';
import { AccessToLocation } from '@utils/access-to-location';

import { useAppSelector } from './hooks';
import { AuthPage, CalendarPage, FeedbacksPage, IndexPage, MainPage } from './pages';

const App = () => {
    const access = AccessToLocation();
    const tokenFromLocalStorage = localStorage.getItem('access token');
    const isAuthenticated = useAppSelector((state) => selectIsAuthenticated(state));

    const isAuthorized = tokenFromLocalStorage || isAuthenticated;

    if (!isAuthenticated) {
        sessionStorage.removeItem('access token');
    }

    return (
        <Routes>
            <Route path={Paths.HOME} element={<IndexPage />} />

            {isAuthorized ? (
                <>
                    <Route element={<AppLayout />}>
                        <Route path='*' element={<Navigate to={Paths.MAIN} />} />
                        <Route path={Paths.HOME} element={<IndexPage />} />
                        <Route path={Paths.MAIN} element={<MainPage />} />
                        <Route path={Paths.FEEDBACKS} element={<FeedbacksPage />} />
                        <Route path={Paths.CALENDAR} element={<CalendarPage />} />
                    </Route>
                </>
            ) : (
                <>
                    <Route path='*' element={<Navigate to={Paths.AUTH} />} />
                    <Route element={<AuthLayout />}>
                        <Route path={Paths.AUTH} element={<AuthPage />} />
                        <Route path={Paths.REGISTER} element={<AuthPage />} />
                        {access && (
                            <>
                                <Route path={Paths.LOGIN_ERROR} element={<LoginError />} />
                                <Route path={Paths.REGISTER_ERROR} element={<RegisterError />} />
                                <Route
                                    path={Paths.REGISTER_ERROR_USER_EXIST}
                                    element={<RegisterErrorUserExist />}
                                />
                                <Route
                                    path={Paths.REGISTER_SUCCESS}
                                    element={<RegisterSuccess />}
                                />
                                <Route
                                    path={Paths.CHECK_EMAIL_ERROR}
                                    element={
                                        <Error500
                                            message='Произошла ошибка, попробуйте отправить форму ещё раз.'
                                            dataTestId='check-back-button'
                                        />
                                    }
                                />
                                <Route
                                    path={Paths.CHECK_EMAIL_ERROR_UNE}
                                    element={<CheckEmailErrorUNE />}
                                />
                                <Route path={Paths.CONFIRM_EMAIL} element={<ConfirmEmail />} />
                                <Route path={Paths.CHANGE_PASSWORD} element={<ChangePassword />} />
                                <Route
                                    path={Paths.CHANGE_PASSWORD_ERROR}
                                    element={<SaveDataError dataTestId='change-retry-button' />}
                                />
                                <Route
                                    path={Paths.CHANGE_PASSWORD_SUCCESS}
                                    element={<ChangePasswordSuccess />}
                                />
                            </>
                        )}
                    </Route>
                </>
            )}
        </Routes>
    );
};

export default App;
