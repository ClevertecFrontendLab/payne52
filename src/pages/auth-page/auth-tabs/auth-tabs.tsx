import { Link } from 'react-router-dom';
import Logo from '@assets/svg/logo/logo.svg?react';
import { Paths } from '@constants/paths';
import { Space, Tabs } from 'antd';

import { LoginForm, RegisterForm } from '.';

import './auth-tabs.scss';

export const AuthTabs = ({ defaultActiveKey }: { defaultActiveKey: string }) => (
    <div className='auth-tabs'>
        <Space className='logo-space'>
            <Logo className='logo' />
        </Space>
        <Tabs defaultActiveKey={defaultActiveKey} className='tabs'>
            <Tabs.TabPane tab={<Link to={Paths.AUTH}>Вход</Link>} key={Paths.AUTH}>
                <LoginForm />
            </Tabs.TabPane>
            <Tabs.TabPane tab={<Link to={Paths.REGISTER}>Регистрация</Link>} key={Paths.REGISTER}>
                <RegisterForm />
            </Tabs.TabPane>
        </Tabs>
    </div>
);
