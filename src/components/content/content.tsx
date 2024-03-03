import { Content } from 'antd/es/layout/layout';

import './content.scss';

type Props = {
    children?: JSX.Element | JSX.Element[];
    className?: string;
};

export const AntdContent = ({ children, className = '' }: Props) => (
    <Content className={`${className && className + ' '}content`}>{children}</Content>
);
