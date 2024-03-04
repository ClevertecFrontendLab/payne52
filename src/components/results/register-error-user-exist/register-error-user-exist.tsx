import { AntdButton } from '@components/button';
import { Paths } from '@constants/paths';
import { history } from '@redux/configure-store';
import { Result } from 'antd';

export const RegisterErrorUserExist = () => {
    const extra = (
        <AntdButton
            type='primary'
            onClick={() => history.push({ pathname: Paths.REGISTER })}
            data-test-id='registration-back-button'
        >
            Назад к регистрации
        </AntdButton>
    );

    return (
        <Result
            className='result'
            status='error'
            title='Данные не сохранились'
            subTitle='Такой e-mail уже записан в системе. Попробуйте зарегистрироваться по другому e-mail.'
            extra={extra}
        />
    );
};
