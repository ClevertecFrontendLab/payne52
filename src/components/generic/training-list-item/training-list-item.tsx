import { EditFilled, EditOutlined } from '@ant-design/icons';
import { AntdBadge } from '@components/index';
import { BadgeType } from '@constants/badge-classes';
import { Button, Space } from 'antd';
import classNames from 'classnames';

import './training-list-item.scss';

type Props = {
    text: string;
    badgeType?: BadgeType;
    edit?: () => void;
    disabled?: boolean;
    dataTestId?: string;
};

export const TrainingListItem = ({ text, badgeType, edit, disabled, dataTestId }: Props) => {
    const listItemClass = classNames({
        'training-list-item': true,
        disabled: disabled,
    });

    return (
        <li className={listItemClass}>
            <Space>
                {badgeType ? <AntdBadge type={badgeType} text={text} /> : <span>{text}</span>}
                {edit && (
                    <Button
                        onClick={edit}
                        type='link'
                        className='edit-button'
                        disabled={disabled}
                        data-test-id={dataTestId}
                    >
                        {disabled ? <EditFilled /> : <EditOutlined />}
                    </Button>
                )}
            </Space>
        </li>
    );
};
