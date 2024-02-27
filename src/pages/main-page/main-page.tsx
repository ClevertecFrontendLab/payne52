import { Suspense } from 'react';
import { AntdContent, AntdFooter, AntdHeader, AntdSider } from '@components/index';
import { Layout } from 'antd';

export const MainPage: React.FC = () => (
    <Suspense>
        <Layout className='app'>
            <AntdSider />
            <Layout>
                <AntdHeader />
                <AntdContent />
                <AntdFooter />
            </Layout>
        </Layout>
    </Suspense>
);
