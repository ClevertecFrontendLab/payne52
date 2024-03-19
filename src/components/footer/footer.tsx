import { AndroidFilled, AppleFilled } from '@ant-design/icons';
import { AntdCard } from '@components/generic/card/card';
import { Paths } from '@constants/paths';
import { history } from '@redux/configure-store';
import { Button, Space } from 'antd';
import { Footer } from 'antd/es/layout/layout';

import './footer.scss';

export const AntdFooter: React.FC = () => (
    <Footer className='footer'>
        <Space className='space'>
            <Button
                type='link'
                className='reviews'
                onClick={() => history.push(Paths.FEEDBACKS)}
                data-test-id='see-reviews'
            >
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
