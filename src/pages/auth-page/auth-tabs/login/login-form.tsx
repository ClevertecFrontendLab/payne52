import { useEffect, useState } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { useLocation } from 'react-router-dom';
import { Paths } from '@constants/paths';
import { history } from '@redux/configure-store';
import { useCheckEmailMutation, useLoginMutation, UserData, UserEmailData } from '@services/auth';
import { isErrorWithMessage } from '@utils/is-error-with-message';
import { RememberMe } from '@utils/rememberMe';
import { Form, Space } from 'antd';
import { ValidateStatus } from 'antd/es/form/FormItem';

import {
    EmailInput,
    ForgetPasswordButton,
    GoogleButton,
    PasswordInput,
    RememberCheckbox,
    SubmitButton,
} from '.';

import './login-form.scss';

export const LoginForm = () => {
    const location = useLocation();
    const email = location.state?.email;
    const retry = location.state?.retry;

    const [form] = Form.useForm();
    const [disabled, setDisabled] = useState(false);
    const [emailFieldStatus, setEmailFieldStatus] = useState<ValidateStatus | undefined>('');

    const handleClickButton = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (!form.getFieldValue('email') || form.getFieldError('email').length) {
            setEmailFieldStatus('error');
            setDisabled(true);
        } else {
            checkEmail({ email: form.getFieldValue('email') });
        }
    };

    const handleChangeFields = () => {
        setDisabled(Boolean(form.getFieldError('email').length));
        setEmailFieldStatus(undefined);
    };

    const [loginUser] = useLoginMutation();

    const login = async (data: UserData) => {
        try {
            await trackPromise(
                loginUser(data)
                    .unwrap()
                    .then((payload) =>
                        RememberMe(form.getFieldValue('remember'), payload.accessToken),
                    ),
            );
            history.replace(Paths.MAIN);
        } catch (err) {
            history.push({ pathname: Paths.LOGIN_ERROR }, { access: true });
        }
    };

    const [checkUserEmail] = useCheckEmailMutation();

    const checkEmail = async (data: UserEmailData) => {
        try {
            await trackPromise(checkUserEmail(data).unwrap());
            history.replace(
                { pathname: Paths.CONFIRM_EMAIL },
                { access: true, email: form.getFieldValue('email') },
            );
        } catch (err) {
            if (isErrorWithMessage(err) && err.data.statusCode == 404) {
                history.push(
                    { pathname: Paths.CHECK_EMAIL_ERROR_UNE },
                    { access: true, email: form.getFieldValue('email') },
                );
            } else {
                history.push(
                    { pathname: Paths.CHECK_EMAIL_ERROR },
                    { access: true, email: form.getFieldValue('email') },
                );
            }
        }
    };

    useEffect(() => {
        if (email) {
            form.setFieldValue('email', email);
            if (retry) {
                checkEmail({ email: form.getFieldValue('email') });
            } else {
                setEmailFieldStatus('error');
                setDisabled(true);
            }
        }
    }, []);

    return (
        <Form
            form={form}
            name='login'
            initialValues={{ remember: true }}
            onFinish={login}
            onFieldsChange={handleChangeFields}
        >
            <EmailInput validateStatus={emailFieldStatus} />
            <PasswordInput />
            <Space className='space-form'>
                <RememberCheckbox />
                <ForgetPasswordButton disabled={disabled} callback={handleClickButton} />
            </Space>

            <SubmitButton>Войти</SubmitButton>
            <GoogleButton>Войти через Google</GoogleButton>
        </Form>
    );
};
