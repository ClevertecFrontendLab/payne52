import { AntdButton } from '@components/button';
import { AntdFormItem } from '@components/form-item/form-item';

export const LoginSubmitButton = () => {
    return (
        <AntdFormItem className='form-item form-item-submit'>
            <AntdButton type='primary' htmlType='submit'>
                Войти
            </AntdButton>
        </AntdFormItem>
    );
};
