import { BadgeClasses, BadgeType } from '@constants/badge-classes';
import { Badge, BadgeProps } from 'antd';
import classNames from 'classnames';

import './badge.scss';

export interface CustomBadgeProps extends BadgeProps {
    type: BadgeType;
}

export const AntdBadge = (props: CustomBadgeProps) => {
    const className = props.className || '';
    const badgeType = BadgeClasses[props.type] || '';
    const badgeClass = classNames({
        [className]: className,
        [badgeType]: badgeType,
        badge: true,
    });

    return <Badge {...props} status='success' className={badgeClass} />;
};
