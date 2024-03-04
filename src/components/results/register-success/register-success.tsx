import { AntdButton } from '@components/button';
import { Success } from '@components/index';
import { Paths } from '@constants/paths';
import { history } from '@redux/configure-store';

export const RegisterSuccess = () => {
    const extra = (
        <AntdButton
            type='primary'
            onClick={() => history.replace(Paths.AUTH)}
            data-test-id='registration-enter-button'
        >
            Войти
        </AntdButton>
    );

    return (
        <Success
            title='Регистрация успешна'
            subTitle='Регистрация прошла успешно. Зайдите в приложение, используя свои e-mail и пароль.'
            extra={extra}
        />
    );
};
