import { Button, ButtonProps } from 'antd';
import classNames from 'classnames';

import './button.scss';

export const AntdButton = (props: ButtonProps) => {
    const className = props.className || '';
    const buttonClass = classNames({
        [className]: className,
        button: true,
    });

    return (
        <Button {...props} className={buttonClass}>
            {props.children}
        </Button>
    );
};
