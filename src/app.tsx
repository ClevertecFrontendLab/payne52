import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthLayout } from '@components/layout/AuthLayout';
import { Paths } from '@constants/paths';
import {
    LoginError,
    RegisterError,
    RegisterErrorUserExist,
    RegisterSuccess,
} from '@pages/auth-page/modal';
import { selectIsAuthorized } from '@redux/authSlice';
import { AccessToLocation } from '@utils/access-to-location';

import { useAppSelector } from './hooks';
import { AuthPage, MainPage } from './pages';

const App = () => {
    const access = AccessToLocation();
    const token = localStorage.getItem('accessToken');
    const isAuthorized = useAppSelector((rootState) => selectIsAuthorized(rootState));

    return (
        <Routes>
            {token && (
                <>
                    <Route path={Paths.HOME} element={<Navigate to={Paths.MAIN} />} />
                    <Route path={Paths.MAIN} element={<MainPage />} />
                    <Route path='*' element={<Navigate to={Paths.MAIN} />} />
                </>
            )}

            {isAuthorized && (
                <>
                    <Route path={Paths.HOME} element={<Navigate to={Paths.MAIN} />} />
                    <Route path={Paths.MAIN} element={<MainPage />} />
                </>
            )}

            {!token && (
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
                            </>
                        )}
                    </Route>
                </>
            )}
        </Routes>
    );
};

export default App;
