import { AntHeader } from '@components/header/header';
import { AntSider } from '@components/sider/sider';
import { Layout } from 'antd';
import { ConfigProvider } from 'antd';
import { Content, Footer } from 'antd/es/layout/layout';

import './index-page.scss';

export const IndexPage: React.FC = () => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    fontFamily: 'Inter, sans-serif',
                },
            }}
        >
            <Layout className='app'>
                <AntSider />
                <Layout>
                    <AntHeader />
                    <Content>Content</Content>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
};
