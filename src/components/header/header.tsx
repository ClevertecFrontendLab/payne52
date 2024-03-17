import { NavLink, useLocation } from 'react-router-dom';
import { Routes } from '@constants/routes';
import { Breadcrumb, Space, Typography } from 'antd';
import { Header } from 'antd/es/layout/layout';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
const { Title } = Typography;

import { SettingOutlined } from '@ant-design/icons';
import { AntdButton } from '@components/index';
import { Paths } from '@constants/paths';

import './header.scss';

export const AntdHeader = () => {
    const breadcrumbs = useBreadcrumbs(Routes);
    const pathname = useLocation().pathname;
    const main = pathname == Paths.MAIN;
    const feedbacks = pathname == Paths.FEEDBACKS;

    return (
        <Header className='header'>
            <Breadcrumb className='breadcrumbs'>
                {breadcrumbs.map(({ match, breadcrumb }) => (
                    <Breadcrumb.Item key={match.pathname}>
                        <NavLink to={match.pathname}>{breadcrumb}</NavLink>
                    </Breadcrumb.Item>
                ))}
            </Breadcrumb>
            {!feedbacks && (
                <Space className='space'>
                    <AntdButton type='text' className='settings'>
                        <SettingOutlined />
                        Настройки
                    </AntdButton>
                    {main && (
                        <Title className='title'>
                            Приветствуем тебя в CleverFit — приложении, которое поможет тебе
                            добиться своей мечты!
                        </Title>
                    )}
                </Space>
            )}
        </Header>
    );
};
