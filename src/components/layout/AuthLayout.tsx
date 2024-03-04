import { usePromiseTracker } from 'react-promise-tracker';
import { Outlet } from 'react-router-dom';
import { Loading } from '@components/loading/loading';
import { Layout, Space } from 'antd';

import { AntdCard } from '..';

const AuthLayout = () => (
    <Layout className='app auth-page'>
        <Loading status={usePromiseTracker().promiseInProgress}>
            <Space className='space'>
                <AntdCard className='content-block'>
                    <Outlet />
                </AntdCard>
            </Space>
        </Loading>
    </Layout>
);

export { AuthLayout };
