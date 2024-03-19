import { Form, FormItemProps } from 'antd';
import classNames from 'classnames';

import './form-item.scss';

export const AntdFormItem = (props: FormItemProps) => {
    const className = props.className || '';
    const formItemClass = classNames({
        [className]: className,
        'form-item': true,
    });

    return (
        <Form.Item {...props} className={formItemClass}>
            {props.children}
        </Form.Item>
    );
};
