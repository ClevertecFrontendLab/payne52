import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { Paths } from '@constants/paths';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { login, selectIsAuthenticated } from '@redux/authSlice';
import { history } from '@redux/configure-store';

export const IndexPage = () => {
    const { search } = useLocation();
    const token = new URLSearchParams(search).get('accessToken');
    const isAuthenticated = useAppSelector((state) => selectIsAuthenticated(state));
    const dispatch = useAppDispatch();

    if (token && !isAuthenticated) {
        localStorage.setItem('access token', token);
        dispatch(login());
    }

    useEffect(() => {
        if (localStorage.getItem('access token') || isAuthenticated) {
            history.replace(Paths.MAIN);
        } else {
            history.replace(Paths.AUTH);
        }
    }, []);

    return <></>;
};
