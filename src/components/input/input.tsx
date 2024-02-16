import { Input, InputProps } from 'antd';
import { PasswordProps } from 'antd/lib/input';

import './input.scss';

export const AntdInput = (props: InputProps) => <Input className='input' {...props} />;

export const AntdInputPassword = (props: PasswordProps) => (
    <Input.Password className='input' {...props} />
);
