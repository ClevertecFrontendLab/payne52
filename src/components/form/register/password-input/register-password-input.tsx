import { AntdFormItem } from '@components/form-item/form-item';
import { AntdInputPassword } from '@components/input';

export const RegisterPasswordInput = () => (
    <AntdFormItem
        name='password'
        className='form-item form-item-password'
        rules={[
            { required: true, message: 'Пароль не менее 8 символов, с заглавной буквой и цифрой' },
            () => ({
                validator(_, value) {
                    if (value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)) {
                        return Promise.resolve();
                    }
                    return Promise.reject();
                },
            }),
        ]}
        help='Пароль не менее 8 символов, с заглавной буквой и цифрой'
        hasFeedback
    >
        <AntdInputPassword placeholder='Пароль' />
    </AntdFormItem>
);

export const RegisterConfirmPasswordInput = () => (
    <AntdFormItem
        name='confirm'
        dependencies={['password']}
        rules={[
            {
                required: true,
                message: '',
            },
            ({ getFieldValue }) => ({
                validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                    }
                    return Promise.reject(new Error('Пароли не совпадают'));
                },
            }),
        ]}
        hasFeedback
    >
        <AntdInputPassword placeholder='Повторите пароль' />
    </AntdFormItem>
);
