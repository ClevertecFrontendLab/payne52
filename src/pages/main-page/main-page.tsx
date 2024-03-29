import { HeartFilled, IdcardOutlined } from '@ant-design/icons';
import { AntdCard, AntdContent, AntdFooter } from '@components/index';
import { NavToCalendarPage } from '@pages/index';
import { Button, Col, Row, Space, Typography } from 'antd';

import './main-page.scss';

export const MainPage: React.FC = () => (
    <>
        <AntdContent className='main-page-content'>
            <Space className='container' direction='vertical' size={16}>
                <Space>
                    <AntdCard className='card-top'>
                        <Typography.Paragraph>
                            С CleverFit ты сможешь: <br />— планировать свои тренировки на
                            календаре, выбирая тип и уровень нагрузки; <br />— отслеживать свои
                            достижения в разделе статистики, сравнивая свои результаты с нормами и
                            рекордами; <br />— создавать свой профиль, где ты можешь загружать свои
                            фото, видео и отзывы о тренировках;
                            <br />— выполнять расписанные тренировки для разных частей тела, следуя
                            подробным инструкциям и советам профессиональных тренеров.
                        </Typography.Paragraph>
                    </AntdCard>
                </Space>
                <Space>
                    <AntdCard className='card-tagline'>
                        <Typography.Paragraph>
                            CleverFit — это не просто приложение, а твой личный помощник в мире
                            фитнеса. Не откладывай на завтра — начни тренироваться уже сегодня!
                        </Typography.Paragraph>
                    </AntdCard>
                </Space>
                <Space className='cards'>
                    <Row gutter={16}>
                        <Col span={8}>
                            <AntdCard title='Расписать тренировки' className='card-item'>
                                <Button type='text'>
                                    <HeartFilled />
                                    Тренировки
                                </Button>
                            </AntdCard>
                        </Col>
                        <Col span={8}>
                            <AntdCard title='Назначить календарь' className='card-item'>
                                <NavToCalendarPage type='button' />
                            </AntdCard>
                        </Col>
                        <Col span={8}>
                            <AntdCard title='Заполнить профиль' className='card-item'>
                                <Button type='text'>
                                    <IdcardOutlined />
                                    Профиль
                                </Button>
                            </AntdCard>
                        </Col>
                    </Row>
                </Space>
            </Space>
        </AntdContent>
        <AntdFooter />
    </>
);
