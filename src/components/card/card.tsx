import { Card, Divider } from 'antd';
import classNames from 'classnames';

import './card.scss';

interface CardInt {
    children?: React.ReactNode;
    className?: string;
    title?: string;
    description?: string;
}

const { Meta } = Card;

export const AntdCard = ({ children, className = '', title, description }: CardInt) => {
    const cardClass = classNames({
        [className]: className,
        'card-meta': description,
        card: true,
    });

    return (
        <>
            {description ? (
                <Card className={cardClass}>
                    <Meta title={title} description={description} />
                    <Divider className='divider' />
                    {children}
                </Card>
            ) : (
                <Card className={cardClass} title={title}>
                    {children}
                </Card>
            )}
        </>
    );
};
