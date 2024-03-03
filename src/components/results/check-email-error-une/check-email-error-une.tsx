import { AntdButton } from '@components/button';
import { Paths } from '@constants/paths';
import { history } from '@redux/configure-store';
import { Result } from 'antd';

export const CheckEmailErrorUNE = () => (
    <Result
        className='result check-email-error check-email-error-une'
        status='error'
        title='Такой e-mail не зарегистрирован'
        subTitle='Мы не нашли в базе вашего e-mail. Попробуйте войти с другим e-mail.'
        extra={
            <AntdButton
                type='primary'
                onClick={() => history.replace({ pathname: Paths.AUTH })}
                data-test-id='check-retry-button'
            >
                Попробовать снова
            </AntdButton>
        }
    />
);
