import { AntdContent, AntdFooter, AntdHeader, AntdSider } from '@components/index';
import { Layout } from 'antd';

export const MainPage: React.FC = () => (
    <Layout className='app'>
        <AntdSider />
        <Layout>
            <AntdHeader />
            <AntdContent />
            <AntdFooter />
        </Layout>
    </Layout>
);
