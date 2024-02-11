import { AntdContent } from '@components/content/content';
import { AntdHeader } from '@components/header/header';
import { AntdSider } from '@components/sider/sider';
import { Layout } from 'antd';
import { ConfigProvider } from 'antd';
import { Footer } from 'antd/es/layout/layout';

export const MainPage: React.FC = () => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    fontFamily: 'Inter, sans-serif',
                    lineHeight: 1.3,
                },
            }}
        >
            <Layout className='app'>
                <AntdSider />
                <Layout>
                    <AntdHeader />
                    <AntdContent />
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>
        </ConfigProvider>
    );
};
