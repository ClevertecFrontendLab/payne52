import { AntdFormItem } from '@components/form-item/form-item';
import { AntdInputPassword } from '@components/input';

type Props = {
    hasFeedback?: boolean;
    message?: boolean;
};

export const PasswordInput = ({ hasFeedback, message }: Props) => (
    <AntdFormItem
        name='password'
        className='form-item form-item-password'
        rules={[
            {
                required: true,
                message: `${
                    (message && 'Пароль не менее 8 символов, с заглавной буквой и цифрой') || ' '
                }`,
            },
            () => ({
                validator(_, value) {
                    if (value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)) {
                        return Promise.resolve();
                    }
                    return Promise.reject();
                },
            }),
        ]}
        help={message && 'Пароль не менее 8 символов, с заглавной буквой и цифрой'}
        hasFeedback={hasFeedback}
    >
        <AntdInputPassword placeholder='Пароль' />
    </AntdFormItem>
);

export const ConfirmPasswordInput = ({ hasFeedback }: Props) => (
    <AntdFormItem
        name='confirmPassword'
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
        hasFeedback={hasFeedback}
    >
        <AntdInputPassword placeholder='Повторите пароль' />
    </AntdFormItem>
);
