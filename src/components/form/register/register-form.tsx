import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from 'antd';

import {
    LoginGoogleButton,
    RegisterConfirmPasswordInput,
    RegisterEmailInput,
    RegisterPasswordInput,
    RegisterSubmitButton,
} from '.';

import './register-form.scss';

export const RegisterForm = () => {
    const navigate = useNavigate();
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

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

    return (
        <Form
            form={form}
            name='register'
            initialValues={{ remember: true }}
            onFinish={() => navigate('/')}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
            onFieldsChange={handleChangeForm}
        >
            <RegisterEmailInput />
            <RegisterPasswordInput />
            <RegisterConfirmPasswordInput />
            <RegisterSubmitButton disabled={disabled} />
            <LoginGoogleButton />
        </Form>
    );
};
