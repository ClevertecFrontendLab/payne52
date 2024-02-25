import { useLocation } from 'react-router-dom';
import { AntdButton } from '@components/button';
import { Paths } from '@constants/paths';
import { history } from '@redux/configure-store';
import { Result } from 'antd';

export const RegisterErrorUserExist = () => {
    const location = useLocation();
    const fields = location.state?.fields;

    return (
        <Result
            className='result'
            status='error'
            title='Данные не сохранились'
            subTitle='Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.'
            extra={
                <AntdButton
                    type='primary'
                    onClick={() => history.push({ pathname: Paths.REGISTER }, { fields: fields })}
                >
                    Назад к регистрации
                </AntdButton>
            }
        />
    );
};
