import { Button, ButtonProps } from 'antd';

import './button.scss';

export const AntdButton = (props: ButtonProps) => (
    <Button className={'button'} {...props}>
        {props.children}
    </Button>
);
