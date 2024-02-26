import { useEffect, useState } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { useLocation } from 'react-router-dom';
import { Paths } from '@constants/paths';
import { history } from '@redux/configure-store';
import { UserData, useRegisterMutation } from '@services/auth';
import { isErrorWithMessage } from '@utils/is-error-with-message';
import { Form } from 'antd';

import { ConfirmPasswordInput, EmailInput, GoogleButton, PasswordInput, SubmitButton } from '.';

import './register-form.scss';

export const RegisterForm = () => {
    const location = useLocation();
    const fields = location.state?.fields;
    const retry = location.state?.retry;

    const [form] = Form.useForm();

    const [, forceUpdate] = useState({});
    const [disabled, setDisabled] = useState(true);

    const handleChangeForm = () => {
        setDisabled(
            !form.isFieldsTouched(true) ||
                !!form.getFieldsError().filter(({ errors }) => errors.length).length,
        );
    };

    useEffect(() => {
        forceUpdate({});
    }, []);

    const [registerUser] = useRegisterMutation();

    const register = async (data: UserData) => {
        try {
            await trackPromise(registerUser(data).unwrap());
            history.replace({ pathname: Paths.REGISTER_SUCCESS }, { access: true });
        } catch (err) {
            if (isErrorWithMessage(err) && err.status == 409) {
                history.push({ pathname: Paths.REGISTER_ERROR_USER_EXIST }, { access: true });
            } else {
                history.push({ pathname: Paths.REGISTER_ERROR }, { access: true, fields: data });
            }
        }
    };

    useEffect(() => {
        if (retry) {
            register(fields);
        }
    }, []);

    return (
        <Form
            form={form}
            name='register'
            initialValues={{ remember: true }}
            onFinish={register}
            onFieldsChange={handleChangeForm}
        >
            <EmailInput dataTestId='registration-email' />
            <PasswordInput message dataTestId='registration-password' />
            <ConfirmPasswordInput dataTestId='registration-confirm-password' />
            <SubmitButton disabled={disabled} dataTestId='registration-submit-button'>
                Регистрация
            </SubmitButton>
            <GoogleButton>Регистрация через Google</GoogleButton>
        </Form>
    );
};
