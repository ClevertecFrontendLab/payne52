import { AntdButton } from '@components/button';
import { Paths } from '@constants/paths';
import { history } from '@redux/configure-store';
import { Result } from 'antd';

export const ChangePasswordSuccess = () => (
    <Result
        className='result'
        status='success'
        title='Пароль успешно изменен'
        subTitle='Теперь можно войти в аккаунт, используя свой логин и новый пароль'
        extra={
            <AntdButton
                type='primary'
                onClick={() => history.push({ pathname: Paths.AUTH })}
                data-test-id='change-entry-button'
            >
                Вход
            </AntdButton>
        }
    />
);
