import { Content } from 'antd/es/layout/layout';
import classNames from 'classnames';

import './content.scss';

type Props = {
    children?: JSX.Element | JSX.Element[];
    className?: string;
};

export const AntdContent = ({ children, className = '' }: Props) => {
    const contentClass = classNames({
        [className]: className,
        content: true,
    });

    return <Content className={contentClass}>{children}</Content>;
};
