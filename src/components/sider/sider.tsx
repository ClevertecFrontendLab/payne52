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
import Exit from '@assets/svg/exit.svg?react';
import LogoMin from '@assets/svg/logo/logo.min.svg?react';
import Logo from '@assets/svg/logo/logo.svg?react';
import { Button, Menu, Space } from 'antd';
import { Grid } from 'antd';
import Sider from 'antd/es/layout/Sider';
const { useBreakpoint } = Grid;

import { Link, useLocation } from 'react-router-dom';
import { Paths } from '@constants/paths';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { NavToCalendarPage } from '@pages/index';
import { logout } from '@redux/authSlice';

import './sider.scss';

export const AntdSider: React.FC = () => {
    const [collapsed, setCollapsed] = useState(true);
    const screens = useBreakpoint();
    const pathname = useLocation().pathname;

    const dispatch = useAppDispatch();
    const userLogout = () => {
        dispatch(logout());

        localStorage.removeItem('access token');
        sessionStorage.removeItem('access token');
    };

    return (
        <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            width={screens.md ? 208 : 106}
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
                <Link to={Paths.MAIN}>
                    {screens.md ? collapsed ? <LogoMin /> : <Logo /> : <Logo />}
                </Link>
            </Space>
            <Menu
                theme='light'
                mode='inline'
                selectedKeys={[pathname]}
                items={[
                    {
                        key: Paths.CALENDAR,
                        icon: <CalendarTwoTone className='calendar-icon' />,
                        label: <NavToCalendarPage />,
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
                        key: Paths.AUTH,
                        icon: <Icon component={Exit} />,
                        label: (
                            <Link to={Paths.AUTH} onClick={userLogout}>
                                Выход
                            </Link>
                        ),
                    },
                ]}
            />
        </Sider>
    );
};
