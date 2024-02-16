import { useEffect, useState } from 'react';
import {
    CalendarTwoTone,
    HeartFilled,
    IdcardOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    TrophyFilled,
} from '@ant-design/icons';
import Icon from '@ant-design/icons';
import { Button, Menu, Space } from 'antd';
import { Grid } from 'antd';
import Sider from 'antd/es/layout/Sider';

import Exit from '../../assets/svg/exit.svg?react';
import LogoMin from '../../assets/svg/logo/logo.min.svg?react';
import Logo from '../../assets/svg/logo/logo.svg?react';
const { useBreakpoint } = Grid;

import { Link } from 'react-router-dom';
import { Paths } from '@constants/paths';

import './sider.scss';

export const AntdSider: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const screens = useBreakpoint();

    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            width={screens.md ? '208' : '106'}
            collapsedWidth={screens.md ? '64' : '0'}
            className='sider'
        >
            <Button
                type='text'
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                className='button_collapse'
                data-test-id={screens.md ? 'sider-switch' : 'sider-switch-mobile'}
            />
            <Space className='logo-space'>
                {screens.md ? collapsed ? <LogoMin /> : <Logo /> : <Logo />}
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
                        label: <Link to={Paths.AUTH}>Выход</Link>,
                    },
                ]}
            />
        </Sider>
    );
};
