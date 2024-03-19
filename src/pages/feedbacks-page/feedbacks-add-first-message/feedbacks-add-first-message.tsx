import { AntdCard } from '@components/index';
import { Typography } from 'antd';
const { Title, Paragraph } = Typography;

export const FeedbacksAddFirstMessage = () => (
    <AntdCard className='feedbacks-add-first'>
        <Title level={3}>Оставьте свой отзыв первым</Title>
        <Paragraph>
            Вы можете быть первым, кто оставит отзыв об этом фитнесс приложении. Поделитесь своим
            мнением и опытом с другими пользователями, и помогите им сделать правильный выбор.
        </Paragraph>
    </AntdCard>
);
