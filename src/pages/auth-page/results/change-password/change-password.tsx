import { useEffect } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { useLocation } from 'react-router-dom';
import { Paths } from '@constants/paths';
import { ConfirmPasswordInput, PasswordInput, SubmitButton } from '@pages/auth-page/form-items';
import { history } from '@redux/configure-store';
import { useChangePasswordMutation, UserNewPasswordData } from '@services/auth';
import { Form, Typography } from 'antd';

import './change-password.scss';

export const ChangePassword = () => {
    const location = useLocation();
    const fields = location.state?.fields;
    const retry = location.state?.retry;

    const [form] = Form.useForm();

    const [changePassword] = useChangePasswordMutation();

    const changePass = async (data: UserNewPasswordData) => {
        try {
            await trackPromise(changePassword(data).unwrap());
            history.replace({ pathname: Paths.CHANGE_PASSWORD_SUCCESS }, { access: true });
        } catch (err) {
            history.push(
                { pathname: Paths.CHANGE_PASSWORD_ERROR },
                {
                    access: true,
                    fields: form.getFieldsValue(),
                },
            );
        }
    };

    useEffect(() => {
        if (fields) {
            form.setFieldsValue(fields);
            if (retry) {
                changePass(fields);
            }
        }
    }, []);

    return (
        <div className='change-password'>
            <Typography.Title level={3}>Восстановление аккауанта</Typography.Title>
            <Form form={form} name='change-password' onFinish={changePass}>
                <PasswordInput message dataTestId='change-password' />
                <ConfirmPasswordInput dataTestId='change-confirm-password' />
                <SubmitButton dataTestId='change-submit-button'>Сохранить</SubmitButton>
            </Form>
        </div>
    );
};
