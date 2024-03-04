import { NavLink } from 'react-router-dom';
import { Routes } from '@constants/routes';
import { Breadcrumb } from 'antd';
import { Header } from 'antd/es/layout/layout';
import useBreadcrumbs from 'use-react-router-breadcrumbs';

import './header.scss';

export const AntdHeader = () => {
    const breadcrumbs = useBreadcrumbs(Routes);

    return (
        <Header className='header'>
            <Breadcrumb className='breadcrumbs'>
                {breadcrumbs.map(({ match, breadcrumb }) => (
                    <Breadcrumb.Item key={match.pathname}>
                        <NavLink to={match.pathname}>{breadcrumb}</NavLink>
                    </Breadcrumb.Item>
                ))}
            </Breadcrumb>
        </Header>
    );
};
