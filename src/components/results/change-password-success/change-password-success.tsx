import { AntdButton } from '@components/generic/button';
import { Success } from '@components/index';
import { Paths } from '@constants/paths';
import { history } from '@redux/configure-store';

export const ChangePasswordSuccess = () => {
    const extra = (
        <AntdButton
            type='primary'
            onClick={() => history.replace({ pathname: Paths.AUTH })}
            data-test-id='change-entry-button'
        >
            Вход
        </AntdButton>
    );

    return (
        <Success
            title='Пароль успешно изменен'
            subTitle='Теперь можно войти в аккаунт, используя свой логин и новый пароль'
            extra={extra}
        />
    );
};
