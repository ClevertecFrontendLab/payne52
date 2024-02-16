import { AntdFormItem } from '@components/form-item/form-item';
import { AntdInput } from '@components/input';

export const LoginEmailInput = () => (
    <AntdFormItem name='email' rules={[{ required: true, message: '' }]}>
        <AntdInput addonBefore='e-mail:' type='email' />
    </AntdFormItem>
);
