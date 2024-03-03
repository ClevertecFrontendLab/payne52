import { UserOutlined } from '@ant-design/icons';
import { Avatar, AvatarProps } from 'antd';

import './avatar.scss';

export const AntdAvatar = (props: AvatarProps) => (
    <Avatar className='avatar' icon={<UserOutlined />} {...props} />
);
