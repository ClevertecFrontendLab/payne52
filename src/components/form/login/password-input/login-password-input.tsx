import { AntdFormItem } from '@components/form-item/form-item';
import { AntdInputPassword } from '@components/input';

export const LoginPasswordInput = () => (
    <AntdFormItem name='password' rules={[{ required: true, message: '' }]}>
        <AntdInputPassword placeholder='Пароль' />
    </AntdFormItem>
);
