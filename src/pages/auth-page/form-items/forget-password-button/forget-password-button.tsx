import { AntdButton } from '@components/generic/button';
import { AntdFormItem } from '@components/generic/form-item/form-item';

type Props = {
    disabled?: boolean;
    callback?: (e: React.MouseEvent<HTMLElement>) => void;
    dataTestId?: string;
};

export const ForgetPasswordButton = ({ disabled, callback, dataTestId }: Props) => (
    <AntdFormItem shouldUpdate className='forget-password'>
        {() => (
            <AntdButton
                type='text'
                disabled={disabled}
                onClick={callback}
                data-test-id={dataTestId}
            >
                Забыли пароль?
            </AntdButton>
        )}
    </AntdFormItem>
);
