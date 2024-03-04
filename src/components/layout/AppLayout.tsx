import { Suspense } from 'react';
import { usePromiseTracker } from 'react-promise-tracker';
import { Outlet } from 'react-router-dom';
import { Loading } from '@components/loading/loading';
import { Layout } from 'antd';

import { AntdHeader, AntdSider } from '..';

const AppLayout = () => (
    <Suspense>
        <Loading status={usePromiseTracker().promiseInProgress}>
            <Layout className='app app-page'>
                <>
                    <AntdSider />
                    <Layout>
                        <AntdHeader />
                        <Outlet />
                    </Layout>
                </>
            </Layout>
        </Loading>
    </Suspense>
);

export { AppLayout };
