import { AntdButton } from '@components/generic/button';
import { AntdFormItem } from '@components/generic/form-item/form-item';

type Props = {
    children: JSX.Element | string;
    disabled?: boolean;
    dataTestId?: string;
};

export const SubmitButton = ({ children, disabled, dataTestId }: Props) => (
    <AntdFormItem shouldUpdate className='form-item-submit'>
        {() => (
            <AntdButton
                type='primary'
                htmlType='submit'
                disabled={disabled}
                data-test-id={dataTestId}
            >
                {children}
            </AntdButton>
        )}
    </AntdFormItem>
);
