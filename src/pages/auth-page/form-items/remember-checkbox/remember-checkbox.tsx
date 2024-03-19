import { AntdFormItem } from '@components/generic/form-item/form-item';
import { Checkbox } from 'antd';

type Props = {
    dataTestId?: string;
};

export const RememberCheckbox = ({ dataTestId }: Props) => (
    <AntdFormItem name='remember' valuePropName='checked' className='remember'>
        <Checkbox data-test-id={dataTestId}>Запомнить меня</Checkbox>
    </AntdFormItem>
);
