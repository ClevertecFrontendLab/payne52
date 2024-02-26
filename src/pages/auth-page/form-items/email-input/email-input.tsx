import { AntdFormItem } from '@components/form-item/form-item';
import { AntdInput } from '@components/input';
import { ValidateStatus } from 'antd/es/form/FormItem';

type Props = {
    validateStatus?: ValidateStatus | undefined;
    dataTestId?: string;
};

export const EmailInput = ({ validateStatus, dataTestId }: Props) => (
    <AntdFormItem
        name='email'
        rules={[{ required: true, type: 'email', message: '' }]}
        validateStatus={validateStatus}
    >
        <AntdInput addonBefore='e-mail:' type='email' data-test-id={dataTestId} />
    </AntdFormItem>
);
