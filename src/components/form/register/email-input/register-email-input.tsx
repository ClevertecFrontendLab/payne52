import { AntdFormItem } from '@components/form-item/form-item';
import { AntdInput } from '@components/input';

export const RegisterEmailInput = () => (
    <AntdFormItem name='email' rules={[{ required: true, type: 'email', message: '' }]}>
        <AntdInput addonBefore='e-mail:' type='email' />
    </AntdFormItem>
);
