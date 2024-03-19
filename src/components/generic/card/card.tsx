import { Card, Divider } from 'antd';
import classNames from 'classnames';

import './card.scss';

interface CardInt {
    children?: React.ReactNode;
    className?: string;
    title?: string;
    description?: string;
    style?: object;
}

const { Meta } = Card;

export const AntdCard = ({ children, className = '', title, description, style }: CardInt) => {
    const cardClass = classNames({
        [className]: className,
        'card-meta': description,
        card: true,
    });

    return (
        <>
            {description ? (
                <Card className={cardClass} style={style}>
                    <Meta title={title} description={description} />
                    <Divider className='divider' />
                    {children}
                </Card>
            ) : (
                <Card className={cardClass} title={title} style={style}>
                    {children}
                </Card>
            )}
        </>
    );
};
