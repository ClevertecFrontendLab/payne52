import { AntdButton } from '@components/button';
import { AntdFormItem } from '@components/form-item/form-item';

type Props = {
    children: JSX.Element | string;
    disabled?: boolean;
};

export const SubmitButton = ({ children, disabled }: Props) => {
    return (
        <AntdFormItem shouldUpdate className='form-item form-item-submit'>
            {() => (
                <AntdButton type='primary' htmlType='submit' disabled={disabled}>
                    {children}
                </AntdButton>
            )}
        </AntdFormItem>
    );
};
