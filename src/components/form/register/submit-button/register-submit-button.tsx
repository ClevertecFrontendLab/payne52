import { AntdButton } from '@components/button';
import { AntdFormItem } from '@components/form-item/form-item';

export const RegisterSubmitButton = ({ disabled }: { disabled: boolean }) => {
    return (
        <AntdFormItem shouldUpdate className='form-item form-item-submit'>
            {() => (
                <AntdButton type='primary' htmlType='submit' disabled={disabled}>
                    Регистрация
                </AntdButton>
            )}
        </AntdFormItem>
    );
};
