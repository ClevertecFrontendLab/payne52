import { AntdAvatar, AntdCard, AntdRate } from '@components/index';
import { ResponceFeedbackData } from '@services/feedback';
import { formatDate } from '@utils/format-date';
import { Space, Typography } from 'antd';

import './feedbacks-item.scss';

export const FeedbacksItem = ({ itemData }: { itemData: ResponceFeedbackData }) => {
    return (
        <AntdCard className='feedbacks-item'>
            <Space align='start' size={12}>
                <div className='author-info'>
                    <AntdAvatar size={42} src={itemData.imageSrc} />
                    <Typography.Paragraph>
                        {itemData.fullName || 'Пользователь'}
                    </Typography.Paragraph>
                </div>
                <div>
                    <Space className='feedback-info' size={16}>
                        <AntdRate disabled value={itemData.rating} />
                        <Typography.Text>{formatDate(itemData.createdAt)}</Typography.Text>
                    </Space>
                    <Typography.Paragraph className='feedback-message'>
                        {itemData.message}
                    </Typography.Paragraph>
                </div>
            </Space>
        </AntdCard>
    );
};
