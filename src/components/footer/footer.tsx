import { AndroidFilled, AppleFilled } from '@ant-design/icons';
import { AntdCard } from '@components/card/card';
import { Button, Space } from 'antd';
import { Footer } from 'antd/es/layout/layout';

import './footer.scss';

export const AntdFooter: React.FC = () => {
    return (
        <Footer className='footer'>
            <Space className='space'>
                <Button type='text' className='reviews'>
                    Смотреть отзывы
                </Button>
                <AntdCard
                    title='Скачать на телефон'
                    description='Доступно в PRO-тарифе'
                    className='card-item'
                >
                    <Button type='text'>
                        <AndroidFilled />
                        Android OS
                    </Button>
                    <Button type='text'>
                        <AppleFilled />
                        Apple iOS
                    </Button>
                </AntdCard>
            </Space>
        </Footer>
    );
};
