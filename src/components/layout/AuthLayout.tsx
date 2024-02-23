import { Outlet } from 'react-router-dom';
import { Layout, Space } from 'antd';

import { AntdCard } from '..';

const AuthLayout = () => {
    return (
        <Layout className='app auth-page'>
            <Space className='space'>
                <AntdCard className='content-block'>
                    <Outlet />
                </AntdCard>
            </Space>
        </Layout>
    );
};

export { AuthLayout };
