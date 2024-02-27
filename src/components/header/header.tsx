import { SettingOutlined } from '@ant-design/icons';
import { Breadcrumb, Space, Typography } from 'antd';
import { Header } from 'antd/es/layout/layout';

import { AntdButton } from '..';

import './header.scss';

const { Title } = Typography;

export const AntdHeader = () => (
    <Header className='header'>
        <Breadcrumb className='breadcrumbs'>
            <Breadcrumb.Item>Главная</Breadcrumb.Item>
        </Breadcrumb>
        <Space className='space'>
            <Title className='title'>
                Приветствуем тебя в CleverFit — приложении, которое поможет тебе добиться своей
                мечты!
            </Title>
            <AntdButton type='text'>
                <SettingOutlined />
                Настройки
            </AntdButton>
        </Space>
    </Header>
);
