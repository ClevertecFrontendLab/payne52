import { AntdContent } from '@components/content/content';
import { AntdFooter } from '@components/footer/footer';
import { AntdHeader } from '@components/header/header';
import { AntdSider } from '@components/sider/sider';
import { Layout } from 'antd';
import { ConfigProvider } from 'antd';

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
                    <AntdFooter />
                </Layout>
            </Layout>
        </ConfigProvider>
    );
};
