import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { Paths } from '@constants/paths';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { login, selectIsAuthorized } from '@redux/authSlice';
import { history } from '@redux/configure-store';

export const IndexPage = () => {
    const { search } = useLocation();
    const token = new URLSearchParams(search).get('accessToken');
    const isAuthorized = useAppSelector((state) => selectIsAuthorized(state));
    const dispatch = useAppDispatch();

    if (token && !isAuthorized) {
        localStorage.setItem('access token', token);
        dispatch(login());
    }

    useEffect(() => {
        if (localStorage.getItem('access token') || isAuthorized) {
            history.replace(Paths.MAIN);
        } else {
            history.replace(Paths.AUTH);
        }
    }, []);

    return <></>;
};
