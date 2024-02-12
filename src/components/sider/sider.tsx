import { useState } from 'react';
import {
    CalendarTwoTone,
    HeartFilled,
    IdcardOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    TrophyFilled,
} from '@ant-design/icons';
import Icon from '@ant-design/icons';
import { useWindowResize } from '@hooks/useWindowResize';
import { Button, Menu, Space } from 'antd';
import Sider from 'antd/es/layout/Sider';

import Exit from '../../../public/assets/svg/exit.svg?react';
import LogoMin from '../../../public/assets/svg/logo/logo.min.svg?react';
import Logo from '../../../public/assets/svg/logo/logo.svg?react';

import './sider.scss';

export const AntdSider: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { width } = useWindowResize();

    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            width={width > 768 ? '208' : '106'}
            collapsedWidth={width > 768 ? '64' : '0'}
            className='sider'
        >
            <Button
                type='text'
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                className='button_collapse'
                data-test-id={width > 768 ? 'sider-switch' : 'sider-switch-mobile'}
            />
            <Space className='logo-space'>
                {width > 768 ? collapsed ? <LogoMin /> : <Logo /> : <Logo />}
            </Space>
            <Menu
                theme='light'
                mode='inline'
                items={[
                    {
                        key: '1',
                        icon: <CalendarTwoTone />,
                        label: 'Календарь',
                    },
                    {
                        key: '2',
                        icon: <HeartFilled />,
                        label: 'Тренировки',
                    },
                    {
                        key: '3',
                        icon: <TrophyFilled />,
                        label: 'Достижения',
                    },
                    {
                        key: '4',
                        icon: <IdcardOutlined />,
                        label: 'Профиль',
                    },
                    {
                        key: '5',
                        icon: <Icon component={Exit} />,
                        label: 'Выход',
                    },
                ]}
            />
        </Sider>
    );
};
