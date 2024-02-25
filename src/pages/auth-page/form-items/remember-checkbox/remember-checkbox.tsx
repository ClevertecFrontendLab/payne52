import { AntdFormItem } from '@components/form-item/form-item';
import { Checkbox } from 'antd';

export const RememberCheckbox = () => (
    <AntdFormItem name='remember' valuePropName='checked' className='form-item remember'>
        <Checkbox>Запомнить меня</Checkbox>
    </AntdFormItem>
);
