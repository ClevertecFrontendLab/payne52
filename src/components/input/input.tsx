import { Input, InputProps } from 'antd';
import { PasswordProps } from 'antd/lib/input';
import classNames from 'classnames';

import './input.scss';

export const AntdInput = (props: InputProps) => {
    const className = props.className || '';
    const inputClass = classNames({
        [className]: className,
        input: true,
    });

    return <Input {...props} className={inputClass} />;
};

export const AntdInputPassword = (props: PasswordProps) => {
    const className = props.className || '';
    const inputPasswordClass = classNames({
        [className]: className,
        input: true,
    });

    return <Input.Password {...props} className={inputPasswordClass} />;
};
