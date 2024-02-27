import { useLocation } from 'react-router-dom';
import { AntdButton } from '@components/button';
import { Paths } from '@constants/paths';
import { history } from '@redux/configure-store';
import { Result } from 'antd';

export const CheckEmailError = () => {
    const location = useLocation();
    const email = location.state?.email;

    return (
        <Result
            className='result check-email-error'
            status='500'
            title='Что-то пошло не так'
            subTitle='Произошла ошибка, попробуйте отправить форму ещё раз.'
            extra={
                <AntdButton
                    type='primary'
                    onClick={() =>
                        history.replace({ pathname: Paths.AUTH }, { email: email, retry: true })
                    }
                    data-test-id='check-back-button'
                >
                    Назад
                </AntdButton>
            }
        />
    );
};
