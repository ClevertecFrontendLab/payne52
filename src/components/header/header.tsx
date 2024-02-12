import { SettingOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Space, Typography } from 'antd';
import { Header } from 'antd/es/layout/layout';

import './header.scss';

const { Title } = Typography;

export const AntdHeader: React.FC = () => {
    return (
        <Header className='header'>
            <Breadcrumb className='breadcrumbs'>
                <Breadcrumb.Item>Главная</Breadcrumb.Item>
            </Breadcrumb>
            <Space className='space'>
                <Title className='title'>
                    Приветствуем тебя в CleverFit — приложении, которое поможет тебе добиться своей
                    мечты!
                </Title>
                <Button type='text' className='setups'>
                    <SettingOutlined />
                    Настройки
                </Button>
            </Space>
        </Header>
    );
};
