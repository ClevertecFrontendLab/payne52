import { Card, Divider } from 'antd';

import './card.scss';

interface CardInt {
    children?: React.ReactNode;
    className?: string;
    title?: string;
    description?: string;
}

const { Meta } = Card;

export const AntdCard = ({ children, className = '', title, description }: CardInt) => (
    <>
        {description ? (
            <Card className={className ? 'card card-meta ' + className : 'card card-meta'}>
                <Meta title={title} description={description} />
                <Divider className='divider' />
                {children}
            </Card>
        ) : (
            <Card className={className ? 'card ' + className : 'card'} title={title}>
                {children}
            </Card>
        )}
    </>
);
