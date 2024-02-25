import { AntdButton } from '@components/button';
import { AntdFormItem } from '@components/form-item/form-item';

type Props = {
    disabled?: boolean;
    callback?: (e: React.MouseEvent<HTMLElement>) => void;
};

export const ForgetPasswordButton = ({ disabled, callback }: Props) => {
    return (
        <AntdFormItem shouldUpdate className='form-item forget-password'>
            {() => (
                <AntdButton type='text' disabled={disabled} onClick={callback}>
                    Забыли пароль?
                </AntdButton>
            )}
        </AntdFormItem>
    );
};
