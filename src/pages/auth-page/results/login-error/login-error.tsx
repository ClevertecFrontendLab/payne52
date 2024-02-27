import { AntdButton } from '@components/button';
import { Paths } from '@constants/paths';
import { history } from '@redux/configure-store';
import { Result } from 'antd';

export const LoginError = () => (
    <Result
        className='result'
        status='warning'
        title='Вход не выполнен'
        subTitle='Что-то пошло не так. Попробуйте еще раз'
        extra={
            <AntdButton
                type='primary'
                onClick={() => history.replace(Paths.AUTH)}
                data-test-id='login-retry-button'
            >
                Повторить
            </AntdButton>
        }
    />
);
