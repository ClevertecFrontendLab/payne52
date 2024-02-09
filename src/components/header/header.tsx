import { SettingOutlined } from '@ant-design/icons';
import { Colors } from '@constants/colors';
import { Breadcrumb, Button, Space, Typography } from 'antd';
import { Header } from 'antd/es/layout/layout';

import styles from './header.module.scss';

const { Title } = Typography;

export const AntHeader: React.FC = () => {
    return (
        <Header style={{ background: Colors.Primary_light[1] }} className={styles.header}>
            <Breadcrumb className={styles.breadcrumbs}>
                <Breadcrumb.Item>Главная</Breadcrumb.Item>
            </Breadcrumb>
            <Space className={styles.space}>
                <Title style={{ color: Colors.Character_light.Title_85 }} className={styles.title}>
                    Приветствуем тебя в CleverFit — приложении, которое поможет тебе добиться своей
                    мечты!
                </Title>
                <Button type='text'>
                    <SettingOutlined />
                    Настройки
                </Button>
            </Space>
        </Header>
    );
};
