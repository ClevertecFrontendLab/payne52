import { Link, useLocation } from 'react-router-dom';
import { LoginForm, RegisterForm } from '@components/form';
import { Layout, Space, Tabs } from 'antd';

import Logo from '../../assets/svg/logo/logo.svg?react';

import './auth-page.scss';

export const AuthPage: React.FC = () => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const { pathname } = useLocation();

    return (
        <Layout className='app login-page'>
            <Space className='space'>
                <div className='content-block'>
                    <Space className='logo-space'>
                        <Logo className='logo' />
                    </Space>
                    <Tabs defaultActiveKey={pathname} className='tabs'>
                        <Tabs.TabPane tab={<Link to='../auth'>Вход</Link>} key='/auth'>
                            <LoginForm />
                        </Tabs.TabPane>
                        <Tabs.TabPane
                            tab={<Link to='../register'>Регистрация</Link>}
                            key='/register'
                        >
                            <RegisterForm />
                        </Tabs.TabPane>
                    </Tabs>
                </div>
            </Space>
        </Layout>
    );
};
