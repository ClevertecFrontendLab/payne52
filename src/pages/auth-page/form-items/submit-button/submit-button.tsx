import { AntdButton } from '@components/button';
import { AntdFormItem } from '@components/form-item/form-item';

type Props = {
    children: JSX.Element | string;
    disabled?: boolean;
    dataTestId?: string;
};

export const SubmitButton = ({ children, disabled, dataTestId }: Props) => {
    return (
        <AntdFormItem shouldUpdate className='form-item form-item-submit'>
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
};
