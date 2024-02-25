import { AntdButton } from '@components/button';
import { Paths } from '@constants/paths';
import { history } from '@redux/configure-store';
import { Result } from 'antd';

export const RegisterSuccess = () => (
    <Result
        className='result'
        status='success'
        title='Регистрация успешна'
        subTitle='Регистрация прошла успешно. Зайдите в приложение, используя свои e-mail и пароль.'
        extra={
            <AntdButton type='primary' onClick={() => history.replace(Paths.AUTH)}>
                Войти
            </AntdButton>
        }
    />
);
