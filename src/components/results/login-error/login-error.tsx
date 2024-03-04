import { AntdButton } from '@components/button';
import { Paths } from '@constants/paths';
import { history } from '@redux/configure-store';
import { Result } from 'antd';

export const LoginError = () => {
    const extra = (
        <AntdButton
            type='primary'
            onClick={() => history.replace(Paths.AUTH)}
            data-test-id='login-retry-button'
        >
            Повторить
        </AntdButton>
    );

    return (
        <Result
            className='result'
            status='warning'
            title='Вход не выполнен'
            subTitle='Что-то пошло не так. Попробуйте еще раз'
            extra={extra}
        />
    );
};
