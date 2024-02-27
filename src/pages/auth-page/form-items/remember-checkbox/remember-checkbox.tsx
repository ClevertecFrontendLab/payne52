import { AntdFormItem } from '@components/form-item/form-item';
import { Checkbox } from 'antd';

type Props = {
    dataTestId?: string;
};

export const RememberCheckbox = ({ dataTestId }: Props) => (
    <AntdFormItem valuePropName='checked' className='form-item remember'>
        <Checkbox data-test-id={dataTestId}>Запомнить меня</Checkbox>
    </AntdFormItem>
);
