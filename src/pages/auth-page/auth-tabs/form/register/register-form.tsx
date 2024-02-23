import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Loading } from '@components/loading/loading';
import { Paths } from '@constants/paths';
import { history } from '@redux/configure-store';
import { UserData, useRegisterMutation } from '@services/auth';
import { isErrorWithMessage } from '@utils/is-error-with-message';
import { Form } from 'antd';
import { ValidateStatus } from 'antd/es/form/FormItem';

import { GoogleButton } from '../../google-button';

import {
    RegisterConfirmPasswordInput,
    RegisterEmailInput,
    RegisterPasswordInput,
    RegisterSubmitButton,
} from '.';

import './register-form.scss';

export const RegisterForm = () => {
    const location = useLocation();
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

    const [registerUser, { isLoading }] = useRegisterMutation();

    const register = async (data: UserData) => {
        try {
            await registerUser(data).unwrap();
            history.replace({ pathname: Paths.REGISTER_SUCCESS }, { access: true });
        } catch (err) {
            if (isErrorWithMessage(err) && err.data.statusCode == 409) {
                history.push(
                    { pathname: Paths.REGISTER_ERROR_USER_EXIST },
                    { access: true, fieldsValue: form.getFieldsValue() },
                );
            } else {
                history.push(
                    { pathname: Paths.REGISTER_ERROR },
                    { access: true, fieldsValue: form.getFieldsValue() },
                );
            }
        }
    };

    useEffect(() => {
        if (location.state?.fieldsValue) {
            form.setFieldsValue(location.state.fieldsValue);
            if (location.state?.retry) {
                register(location.state.fieldsValue);
            } else {
                setEmailFieldStatus('error');
            }
        }
    }, []);

    return (
        <Loading status={isLoading}>
            <Form
                form={form}
                name='register'
                initialValues={{ remember: true }}
                onFinish={register}
                onFieldsChange={handleChangeForm}
            >
                <RegisterEmailInput validateStatus={emailFieldStatus} />
                <RegisterPasswordInput />
                <RegisterConfirmPasswordInput />
                <RegisterSubmitButton disabled={disabled} />
                <GoogleButton />
            </Form>
        </Loading>
    );
};
