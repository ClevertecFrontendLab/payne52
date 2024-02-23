import { useLocation } from 'react-router-dom';

import { AuthTabs } from './auth-tabs/auth-tabs';

import './auth-page.scss';

export const AuthPage = () => {
    const { pathname } = useLocation();

    return <AuthTabs defaultActiveKey={pathname} />;
};
