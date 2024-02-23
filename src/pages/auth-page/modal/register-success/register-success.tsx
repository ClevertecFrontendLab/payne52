import Success from '@assets/svg/success.svg?react';
import { AntdButton } from '@components/button';
import { Paths } from '@constants/paths';
import { history } from '@redux/configure-store';
import { Typography } from 'antd';

export const RegisterSuccess = () => (
    <div className='modal'>
        <Success />
        <div className='message'>
            <Typography.Title level={3}>Регистрация успешна</Typography.Title>
            <Typography.Text>
                Регистрация прошла успешно. Зайдите в приложение, используя свои e-mail и пароль.
            </Typography.Text>
        </div>
        <AntdButton type='primary' onClick={() => history.replace(Paths.AUTH)}>
            Войти
        </AntdButton>
    </div>
);
