import { Form, FormItemProps } from 'antd';

import './form-item.scss';

export const AntdFormItem = (props: FormItemProps) => (
    <Form.Item className='form-item' {...props}>
        {props.children}
    </Form.Item>
);
