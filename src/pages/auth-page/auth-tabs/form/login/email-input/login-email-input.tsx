import { AntdFormItem } from '@components/form-item/form-item';
import { AntdInput } from '@components/input';
import { ValidateStatus } from 'antd/es/form/FormItem';

export const LoginEmailInput = ({
    validateStatus,
}: {
    validateStatus: ValidateStatus | undefined;
}) => (
    <AntdFormItem
        name='email'
        rules={[{ required: true, type: 'email', message: '' }]}
        validateStatus={validateStatus}
    >
        <AntdInput addonBefore='e-mail:' type='email' />
    </AntdFormItem>
);
