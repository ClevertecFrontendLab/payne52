import { AntdFormItem } from '@components/form-item/form-item';
import { Checkbox } from 'antd';

export const LoginRememberCheckbox = () => (
    <AntdFormItem
        name='remember'
        valuePropName='checked'
        wrapperCol={{ offset: 8, span: 16 }}
        className='form-item remember'
    >
        <Checkbox>Запомнить меня</Checkbox>
    </AntdFormItem>
);
