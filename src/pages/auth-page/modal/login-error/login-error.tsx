import Warning from '@assets/svg/warning.svg?react';
import { AntdButton } from '@components/button';
import { Paths } from '@constants/paths';
import { history } from '@redux/configure-store';
import { Typography } from 'antd';

export const LoginError = () => (
    <div className='modal'>
        <Warning />
        <div className='message'>
            <Typography.Title level={3}>Вход не выполнен</Typography.Title>
            <Typography.Text>Что-то пошло не так. Попробуйте еще раз</Typography.Text>
        </div>
        <AntdButton type='primary' onClick={() => history.replace(Paths.AUTH)}>
            Повторить
        </AntdButton>
    </div>
);
