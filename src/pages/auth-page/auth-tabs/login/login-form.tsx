import { useEffect, useState } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { useLocation } from 'react-router-dom';
import { Paths } from '@constants/paths';
import { history } from '@redux/configure-store';
import { useCheckEmailMutation, useLoginMutation, UserData, UserEmailData } from '@services/auth';
import { isErrorWithMessage } from '@utils/is-error-with-message';
import { RememberMe } from '@utils/remember-me';
import { Form, Space } from 'antd';

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
    const emailValue = Form.useWatch('email', form);
    const rememberlValue = Form.useWatch('remember', form);
    const [disabled, setDisabled] = useState(false);

    const handleClickButton = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (!emailValue || form.getFieldError('email').length) {
            setDisabled(true);
        } else {
            checkEmail({ email: emailValue });
        }
    };

    const handleChangeFields = () => {
        setDisabled(Boolean(form.getFieldError('email').length));
    };

    const [loginUser] = useLoginMutation();

    const login = async (data: UserData) => {
        try {
            await trackPromise(
                loginUser({ email: data.email, password: data.password })
                    .unwrap()
                    .then((payload) => RememberMe(rememberlValue, payload.accessToken)),
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
            history.push({ pathname: Paths.CONFIRM_EMAIL }, { access: true, email: data.email });
        } catch (err) {
            if (
                isErrorWithMessage(err) &&
                err.status == 404 &&
                (err.data.message as string) == 'Email не найден'
            ) {
                history.push(
                    { pathname: Paths.CHECK_EMAIL_ERROR_UNE },
                    { access: true, email: data.email },
                );
            } else {
                history.push(
                    { pathname: Paths.CHECK_EMAIL_ERROR },
                    { access: true, email: data.email, pathFrom: location.pathname },
                );
            }
        }
    };

    useEffect(() => {
        if (retry) {
            checkEmail({ email: email });
        }
    }, []);

    return (
        <Form
            form={form}
            name='login'
            initialValues={{ remember: false }}
            onFinish={login}
            onFieldsChange={handleChangeFields}
        >
            <EmailInput dataTestId='login-email' />
            <PasswordInput dataTestId='login-password' />
            <Space className='space-form'>
                <RememberCheckbox dataTestId='login-remember' />
                <ForgetPasswordButton
                    disabled={disabled}
                    callback={handleClickButton}
                    dataTestId='login-forgot-button'
                />
            </Space>

            <SubmitButton dataTestId='login-submit-button'>Войти</SubmitButton>
            <GoogleButton>Войти через Google</GoogleButton>
        </Form>
    );
};
