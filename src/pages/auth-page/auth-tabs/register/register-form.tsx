import { useEffect, useState } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { useLocation } from 'react-router-dom';
import { Paths } from '@constants/paths';
import { history } from '@redux/configure-store';
import { UserData, useRegisterMutation } from '@services/auth';
import { isErrorWithMessage } from '@utils/is-error-with-message';
import { Form } from 'antd';
import { ValidateStatus } from 'antd/es/form/FormItem';

import { ConfirmPasswordInput, EmailInput, GoogleButton, PasswordInput, SubmitButton } from '.';

import './register-form.scss';

export const RegisterForm = () => {
    const location = useLocation();
    const fields = location.state?.fields;
    const retry = location.state?.retry;

    const [form] = Form.useForm();

    const [, forceUpdate] = useState({});
    const [disabled, setDisabled] = useState(true);
    const [emailFieldStatus, setEmailFieldStatus] = useState<ValidateStatus | undefined>('');

    const handleChangeForm = () => {
        setDisabled(
            !form.isFieldsTouched(true) ||
                !!form.getFieldsError().filter(({ errors }) => errors.length).length,
        );
        setEmailFieldStatus(undefined);
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
            if (isErrorWithMessage(err) && err.data.statusCode == 409) {
                history.push(
                    { pathname: Paths.REGISTER_ERROR_USER_EXIST },
                    { access: true, fields: form.getFieldsValue() },
                );
            } else {
                history.push(
                    { pathname: Paths.REGISTER_ERROR },
                    { access: true, fields: form.getFieldsValue() },
                );
            }
        }
    };

    useEffect(() => {
        if (fields) {
            form.setFieldsValue(fields);
            if (retry) {
                register(fields);
            } else {
                setEmailFieldStatus('error');
            }
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
            <EmailInput validateStatus={emailFieldStatus} />
            <PasswordInput message />
            <ConfirmPasswordInput />
            <SubmitButton disabled={disabled}>Регистрация</SubmitButton>
            <GoogleButton>Регистрация через Google</GoogleButton>
        </Form>
    );
};
