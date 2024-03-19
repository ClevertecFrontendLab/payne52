import { AntdFormItem } from '@components/generic/form-item/form-item';
import { AntdInputPassword } from '@components/generic/input';

type Props = {
    hasFeedback?: boolean;
    message?: boolean;
    dataTestId?: string;
};

export const PasswordInput = ({ hasFeedback, message = false, dataTestId }: Props) => (
    <AntdFormItem
        name='password'
        className='form-item-password'
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
        <AntdInputPassword placeholder='Пароль' data-test-id={dataTestId} />
    </AntdFormItem>
);

export const ConfirmPasswordInput = ({ hasFeedback, dataTestId }: Props) => (
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
        <AntdInputPassword placeholder='Повторите пароль' data-test-id={dataTestId} />
    </AntdFormItem>
);
