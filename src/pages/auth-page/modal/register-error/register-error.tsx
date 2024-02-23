import { useLocation } from 'react-router-dom';
import Error from '@assets/svg/error.svg?react';
import { AntdButton } from '@components/button';
import { Paths } from '@constants/paths';
import { history } from '@redux/configure-store';
import { Typography } from 'antd';

export const RegisterError = () => {
    const location = useLocation();

    return (
        <div className='modal'>
            <Error />
            <div className='message'>
                <Typography.Title level={3}>Данные не сохранились</Typography.Title>
                <Typography.Text>
                    Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз.
                </Typography.Text>
            </div>
            <AntdButton
                type='primary'
                onClick={() =>
                    history.push(
                        { pathname: Paths.REGISTER },
                        { fieldsValue: location.state?.fieldsValue, retry: true },
                    )
                }
            >
                Повтор
            </AntdButton>
        </div>
    );
};
