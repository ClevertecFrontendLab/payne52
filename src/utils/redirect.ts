import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { history } from '@redux/configure-store';

export const Redirect = (to: string) => {
    const location = useLocation();

    useEffect(() => {
        if (!location.state?.access) {
            history.replace(to);
        }
    }, []);

    return;
};
