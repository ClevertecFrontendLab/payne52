import { useNavigate } from 'react-router-dom';
import { Form } from 'antd';

import {
    LoginEmailInput,
    LoginGoogleButton,
    LoginPasswordInput,
    LoginRememberCheckbox,
    LoginSubmitButton,
} from '.';

import './login-form.scss';

export const LoginForm = () => {
    const navigate = useNavigate();
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name='login'
            initialValues={{ remember: true }}
            onFinish={() => navigate('/')}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
        >
            <LoginEmailInput />
            <LoginPasswordInput />
            <LoginRememberCheckbox />
            <LoginSubmitButton />
            <LoginGoogleButton />
        </Form>
    );
};
