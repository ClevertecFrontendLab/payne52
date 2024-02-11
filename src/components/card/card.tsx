import { Card } from 'antd';

import './card.scss';

interface CardInt {
    children?: React.ReactNode;
    className?: string;
    title?: React.ReactNode;
}

export const AntdCard = ({ children, className = '', title }: CardInt) => {
    return (
        <Card className={className ? 'card ' + className : 'card'} title={title}>
            {children}
        </Card>
    );
};
