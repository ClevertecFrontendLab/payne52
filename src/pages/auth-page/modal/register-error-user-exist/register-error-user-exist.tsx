import { useLocation } from 'react-router-dom';
import Error from '@assets/svg/error.svg?react';
import { AntdButton } from '@components/button';
import { Paths } from '@constants/paths';
import { history } from '@redux/configure-store';
import { Typography } from 'antd';

export const RegisterErrorUserExist = () => {
    const location = useLocation();

    return (
        <div className='modal'>
            <Error />
            <div className='message'>
                <Typography.Title level={3}>Данные не сохранились</Typography.Title>
                <Typography.Text>
                    Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому
                    e-mail.
                </Typography.Text>
            </div>
            <AntdButton
                type='primary'
                onClick={() =>
                    history.push(
                        { pathname: Paths.REGISTER },
                        { fieldsValue: location.state?.fieldsValue },
                    )
                }
            >
                Назад к регистрации
            </AntdButton>
        </div>
    );
};
