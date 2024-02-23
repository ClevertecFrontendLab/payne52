import { useState } from 'react';
import { Loading } from '@components/loading/loading';
import { Paths } from '@constants/paths';
import { history } from '@redux/configure-store';
import { useLoginMutation, UserData } from '@services/auth';
import { RememberMe } from '@utils/rememberMe';
import { Form, Space } from 'antd';

import { GoogleButton } from '../../google-button';

import { ValidateStatusType } from './email-input/login-email-input';
import {
    ForgetPasswordButton,
    LoginEmailInput,
    LoginPasswordInput,
    LoginRememberCheckbox,
    LoginSubmitButton,
} from '.';

import './login-form.scss';

export const LoginForm = () => {
    const [form] = Form.useForm();
    const [disabled, setDisabled] = useState(false);
    const [validateStatus, setValidateStatus] = useState<ValidateStatusType>('');
    const emailValue = Form.useWatch('email', form);

    const handleClickButton = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        if (!emailValue || form.getFieldError('email').length) {
            setValidateStatus('error');
            setDisabled(true);
        } else {
            alert('success');
        }
    };

    const handleChangeFields = () => {
        setDisabled(Boolean(form.getFieldError('email').length));

        if (!form.getFieldError('email').length) {
            setValidateStatus('');
        } else {
            setValidateStatus('error');
        }
    };

    const [loginUser, { isLoading }] = useLoginMutation();

    const login = async (data: UserData) => {
        try {
            await loginUser(data)
                .unwrap()
                .then((payload) => RememberMe(form.getFieldValue('remember'), payload.accessToken));
            history.replace(Paths.MAIN);
        } catch (err) {
            history.push({ pathname: Paths.LOGIN_ERROR }, { access: true });
        }
    };

    return (
        <Loading status={isLoading}>
            <Form
                form={form}
                name='login'
                initialValues={{ remember: true }}
                onFinish={login}
                onFieldsChange={handleChangeFields}
            >
                <LoginEmailInput validateStatus={validateStatus} />
                <LoginPasswordInput />
                <Space className='space-form'>
                    <LoginRememberCheckbox />
                    <ForgetPasswordButton disabled={disabled} callback={handleClickButton} />
                </Space>

                <LoginSubmitButton />
                <GoogleButton />
            </Form>
        </Loading>
    );
};
